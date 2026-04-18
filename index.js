const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const { createRoom, joinRoom, leaveRoom, getRoom, getRoomByPlayerId, saveSession, getSession, clearSession, restorePlayer } = require('./roomManager')
const { startGame, submitColour, nextRound, playAgain } = require('./gameManager')

const app = express()
app.use(cors())

const server = http.createServer(app)

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

const io = new Server(server, {
  pingTimeout: 60000,
  pingInterval: 25000,
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id)

  // --- CREATE ROOM ---
  socket.on('create_room', ({ name, sessionId }) => {
    const room = createRoom(socket.id, name)
    socket.join(room.code)
    if (sessionId) saveSession(sessionId, name, room.code)
    socket.emit('room_created', {
      code: room.code,
      players: room.players,
      hostId: room.hostId
    })
    console.log(`Room ${room.code} created by ${name}`)
  })

  // --- JOIN ROOM ---
  socket.on('join_room', ({ code, name, sessionId }) => {
    const result = joinRoom(code.toUpperCase(), socket.id, name)
    if (result.error) {
      socket.emit('error', { message: result.error })
      return
    }
    socket.join(result.code)
    if (sessionId) saveSession(sessionId, name, result.code)
    socket.emit('room_joined', {
      code: result.code,
      players: result.players,
      hostId: result.hostId
    })
    socket.to(result.code).emit('player_joined', {
      players: result.players
    })
    console.log(`${name} joined room ${result.code}`)
  })

  // --- RESTORE SESSION (reconnect after tab switch) ---
  socket.on('restore_session', ({ sessionId }) => {
    const session = getSession(sessionId)
    if (!session) {
      socket.emit('session_not_found')
      return
    }

    const room = restorePlayer(sessionId, socket.id)
    if (!room) {
      clearSession(sessionId)
      socket.emit('session_not_found')
      return
    }

    socket.join(room.code)

    // Tell this player their state is restored
    socket.emit('session_restored', {
      code: room.code,
      players: room.players,
      hostId: room.hostId,
      state: room.state,
      round: room.round,
      name: session.name
    })

    // Tell others they're back
    socket.to(room.code).emit('player_joined', {
      players: room.players
    })

    console.log(`Session restored for ${session.name} in room ${room.code}`)
  })

  // --- START GAME ---
  socket.on('start_game', ({ code }) => {
    const room = getRoom(code)
    if (!room) return
    if (room.hostId !== socket.id) return
    if (room.players.length < 2) return
    if (room.state !== 'WAITING') return
    console.log(`Game starting in room ${code}`)
    startGame(io, code)
  })

  // --- SUBMIT COLOUR ---
  socket.on('submit_colour', ({ code, colour, name }) => {
    submitColour(io, code, name, colour)
  })

  // --- NEXT ROUND (host only) ---
  socket.on('next_round', ({ code }) => {
    const room = getRoom(code)
    if (!room) return
    if (room.hostId !== socket.id) return
    nextRound(io, code)
  })

  // --- PLAY AGAIN (host only) ---
  socket.on('play_again', ({ code }) => {
    const room = getRoom(code)
    if (!room) return
    if (room.hostId !== socket.id) return
    playAgain(io, code)
  })

  // --- LEAVE ROOM (voluntary) ---
  socket.on('leave_room', () => {
    const room = leaveRoom(socket.id)
    if (room) {
      io.to(room.code).emit('player_left', {
        players: room.players,
        hostId: room.hostId
      })
    }
  })

  // --- DISCONNECT ---
  socket.on('disconnect', () => {
    const roomBefore = getRoomByPlayerId(socket.id)
    const wasHost = roomBefore ? roomBefore.hostId === socket.id : false

    // Don't immediately remove — session may be restoring
    // leaveRoom is still called but session persists for reconnection
    const room = leaveRoom(socket.id)

    if (room) {
      io.to(room.code).emit('player_left', {
        players: room.players,
        hostId: room.hostId
      })

      if (wasHost && room.hostId) {
        io.to(room.hostId).emit('promoted_to_host')
      }

      const midGameStates = ['ROUND_START', 'PICKING', 'REVEAL']
      if (midGameStates.includes(room.state) && room.players.length < 2) {
        if (room.timer) {
          clearInterval(room.timer)
          clearTimeout(room.timer)
          room.timer = null
        }
        room.state = 'WAITING'
        io.to(room.code).emit('game_ended_early', {
          message: 'A player disconnected. Not enough players to continue.'
        })
      }
    }

    console.log('Player disconnected:', socket.id)
  })

}) // end io.on('connection')

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})