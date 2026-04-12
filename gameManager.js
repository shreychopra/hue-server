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

  const average = {
    h: colours.reduce((sum, c) => sum + c.h, 0) / colours.length,
    s: colours.reduce((sum, c) => sum + c.s, 0) / colours.length,
    b: colours.reduce((sum, c) => sum + c.b, 0) / colours.length
  }

  const scores = calculateScores(room.submissions, average)

  room.players.forEach(p => {
    p.score += scores[p.name] || 0
  })

  io.to(roomCode).emit('round_reveal', {
    submissions: room.submissions,
    scores,
    average
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

function deltaE(lab1, lab2) {
  return Math.sqrt(
    Math.pow(lab1.l - lab2.l, 2) +
    Math.pow(lab1.a - lab2.a, 2) +
    Math.pow(lab1.b - lab2.b, 2)
  )
}

function calculateScores(submissions, average) {
  const avgLab = hsbToLab(average.h, average.s, average.b)
  const scores = {}

  Object.entries(submissions).forEach(([name, colour]) => {
    const playerLab = hsbToLab(colour.h, colour.s, colour.b)
    const distance = deltaE(playerLab, avgLab)
    scores[name] = Math.round(Math.max(0, 100 - distance))
  })

  return scores
}

module.exports = { startGame, submitColour, nextRound, playAgain }