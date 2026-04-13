const { selectWords } = require('./wordBank')
const { getRoom } = require('./roomManager')

const ROUND_START_DURATION = 3
const PICKING_DURATION = 20

function startGame(io, roomCode) {
  const room = getRoom(roomCode)
  if (!room) return

  room.words = selectWords()
  room.round = 0
  room.state = 'IN_PROGRESS'
  room.players.forEach(p => p.score = 0)

  io.to(roomCode).emit('game_started')
  setTimeout(() => startRound(io, roomCode), 500)
}

function startRound(io, roomCode) {
  const room = getRoom(roomCode)
  if (!room) return

  room.round += 1
  room.submissions = {}
  room.state = 'ROUND_START'

  const word = room.words[room.round - 1]

  io.to(roomCode).emit('round_start', {
    round: room.round,
    word
  })

  room.timer = setTimeout(() => startPicking(io, roomCode), ROUND_START_DURATION * 1000)
}

function startPicking(io, roomCode) {
  const room = getRoom(roomCode)
  if (!room) return

  room.state = 'PICKING'
  let timeLeft = PICKING_DURATION

  io.to(roomCode).emit('picking_start')

  room.timer = setInterval(() => {
    timeLeft -= 1
    io.to(roomCode).emit('timer_tick', { timeLeft })

    const allSubmitted = room.players.every(p => room.submissions[p.name])

    if (timeLeft <= 0 || allSubmitted) {
      clearInterval(room.timer)
      room.timer = null
      // Emit timer_done so clients know to submit immediately
      io.to(roomCode).emit('timer_done')
      // Give clients 1 second to submit their colours before revealing
      room.timer = setTimeout(() => {
        // Fill in grey only for players who truly never submitted anything
        room.players.forEach(p => {
          if (!room.submissions[p.name]) {
            room.submissions[p.name] = { h: 0, s: 0, b: 50 }
          }
        })
        revealRound(io, roomCode)
      }, 1000)
    }
  }, 1000)
}

function submitColour(io, roomCode, playerName, colour) {
  const room = getRoom(roomCode)
  if (!room) return
  if (room.state !== 'PICKING') return

  room.submissions[playerName] = colour

  const allSubmitted = room.players.every(p => room.submissions[p.name])
  if (allSubmitted) {
    if (room.timer) {
      clearInterval(room.timer)
      room.timer = null
    }
    revealRound(io, roomCode)
  }
}

function revealRound(io, roomCode) {
  const room = getRoom(roomCode)
  if (!room) return

  room.state = 'REVEAL'

  const names = Object.keys(room.submissions)
  const colours = names.map(name => room.submissions[name])
  const labColours = colours.map(c => hsbToLab(c.h, c.s, c.b))

  // Average in Lab space for display purposes only
  const avgLab = {
    l: labColours.reduce((sum, c) => sum + c.l, 0) / labColours.length,
    a: labColours.reduce((sum, c) => sum + c.a, 0) / labColours.length,
    b: labColours.reduce((sum, c) => sum + c.b, 0) / labColours.length
  }

  const avgHsb = labToHsb(avgLab)

  // Score each player by their average Delta-E distance to ALL other players
  // This means: if you picked a colour close to everyone else, you score high
  // If you picked an outlier, you score low
  // With 2 players this correctly gives different scores when colours differ
  const scores = {}
  names.forEach((name, i) => {
    const otherLabs = labColours.filter((_, j) => j !== i)
    if (otherLabs.length === 0) {
      scores[name] = 100
      return
    }
    const avgDistToOthers = otherLabs.reduce((sum, other) => sum + deltaE(labColours[i], other), 0) / otherLabs.length
    scores[name] = Math.round(Math.max(0, 100 - avgDistToOthers))
  })

  room.players.forEach(p => {
    p.score += scores[p.name] || 0
  })

  io.to(roomCode).emit('round_reveal', {
    submissions: room.submissions,
    scores,
    average: avgHsb
  })
}

function nextRound(io, roomCode) {
  const room = getRoom(roomCode)
  if (!room) return

  if (room.round >= 5) {
    endGame(io, roomCode)
  } else {
    startRound(io, roomCode)
  }
}

function endGame(io, roomCode) {
  const room = getRoom(roomCode)
  if (!room) return

  room.state = 'GAME_OVER'

  const finalScores = {}
  room.players.forEach(p => {
    finalScores[p.name] = p.score
  })

  io.to(roomCode).emit('game_over', { scores: finalScores })
}

function playAgain(io, roomCode) {
  const room = getRoom(roomCode)
  if (!room) return

  if (room.timer) {
    clearInterval(room.timer)
    clearTimeout(room.timer)
    room.timer = null
  }

  room.state = 'WAITING'
  room.round = 0
  room.words = []
  room.submissions = {}

  // Keep only the host in the room — participants must actively rejoin
  room.players = room.players.filter(p => p.id === room.hostId)
  room.players.forEach(p => p.score = 0)

  io.to(roomCode).emit('game_reset', {
    players: room.players,
    hostId: room.hostId
  })
}

// --- Colour math ---

function hsbToLab(h, s, b) {
  s /= 100
  b /= 100
  const k = (n) => (n + h / 60) % 6
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)))
  const r = f(5) * 255
  const g = f(3) * 255
  const bl = f(1) * 255

  let rr = r / 255
  let gg = g / 255
  let bb = bl / 255
  rr = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92
  gg = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92
  bb = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92
  rr *= 100; gg *= 100; bb *= 100

  const x = rr * 0.4124 + gg * 0.3576 + bb * 0.1805
  const y = rr * 0.2126 + gg * 0.7152 + bb * 0.0722
  const z = rr * 0.0193 + gg * 0.1192 + bb * 0.9505

  const fx = x / 95.047
  const fy = y / 100.000
  const fz = z / 108.883
  const ff = (t) => t > 0.008856 ? Math.pow(t, 1 / 3) : (7.787 * t) + (16 / 116)

  return {
    l: (116 * ff(fy)) - 16,
    a: 500 * (ff(fx) - ff(fy)),
    b: 200 * (ff(fy) - ff(fz))
  }
}

function labToHsb(lab) {
  // Lab → XYZ
  const fy = (lab.l + 16) / 116
  const fx = lab.a / 500 + fy
  const fz = fy - lab.b / 200

  const x = (fx > 0.206897 ? Math.pow(fx, 3) : (fx - 16 / 116) / 7.787) * 95.047
  const y = (fy > 0.206897 ? Math.pow(fy, 3) : (fy - 16 / 116) / 7.787) * 100.000
  const z = (fz > 0.206897 ? Math.pow(fz, 3) : (fz - 16 / 116) / 7.787) * 108.883

  // XYZ → RGB (linear)
  let r = x * 3.2406 + y * -1.5372 + z * -0.4986
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415
  let b = x * 0.0557 + y * -0.2040 + z * 1.0570

  // Clamp
  r = Math.max(0, Math.min(1, r / 100))
  g = Math.max(0, Math.min(1, g / 100))
  b = Math.max(0, Math.min(1, b / 100))

  // Apply gamma
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b

  // RGB → HSB
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min

  let h = 0
  if (diff !== 0) {
    if (max === r) h = ((g - b) / diff + 6) % 6
    else if (max === g) h = (b - r) / diff + 2
    else h = (r - g) / diff + 4
    h *= 60
  }

  const s = max === 0 ? 0 : (diff / max) * 100
  const brightness = max * 100

  return { h, s, b: brightness }
}

function deltaE(lab1, lab2) {
  return Math.sqrt(
    Math.pow(lab1.l - lab2.l, 2) +
    Math.pow(lab1.a - lab2.a, 2) +
    Math.pow(lab1.b - lab2.b, 2)
  )
}

module.exports = { startGame, submitColour, nextRound, playAgain }