const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const { createRoom, joinRoom, leaveRoom, getRoom, getRoomByPlayerId } = require('./roomManager')
const { startGame, submitColour, nextRound, playAgain } = require('./gameManager')

const app = express()
app.use(cors())

const server = http.createServer(app)

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id)

  // --- CREATE ROOM ---
  socket.on('create_room', ({ name }) => {
    const room = createRoom(socket.id, name)
    socket.join(room.code)
    socket.emit('room_created', {
      code: room.code,
      players: room.players,
      hostId: room.hostId
    })
    console.log(`Room ${room.code} created by ${name}`)
  })

  // --- JOIN ROOM ---
  socket.on('join_room', ({ code, name }) => {
    const result = joinRoom(code.toUpperCase(), socket.id, name)
    if (result.error) {
      socket.emit('error', { message: result.error })
      return
    }
    socket.join(result.code)
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
    // Check if this socket was the host BEFORE removing them
    const roomBefore = getRoomByPlayerId(socket.id)
    const wasHost = roomBefore ? roomBefore.hostId === socket.id : false

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