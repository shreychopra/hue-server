const { generateCode } = require('./utils/generateCode')

// All active rooms stored in memory
// Structure: { roomCode: roomObject }
const rooms = {}
const sessions = {} // { sessionId: { name, roomCode } }

// Create a new room, returns the room object
function createRoom(hostId, hostName) {
  let code = generateCode()
  while (rooms[code]) code = generateCode()

  rooms[code] = {
    code,
    hostId,
    players: [{ id: hostId, name: hostName, score: 0 }],
    state: 'WAITING',
    round: 0,
    words: [],
    submissions: {},
    timer: null,
    mode: 'classic'   // default mode
  }

  return rooms[code]
}

// Add a player to an existing room
// Returns the room, or an error string if something is wrong
function joinRoom(roomCode, playerId, playerName) {
  const room = rooms[roomCode]

  if (!room) return { error: 'Room not found' }
  if (room.state !== 'WAITING') return { error: 'Game already in progress' }
  if (room.players.length >= 8) return { error: 'Room is full' }

  // Check for duplicate names
  const nameExists = room.players.some(p => p.name.toLowerCase() === playerName.toLowerCase())
  if (nameExists) return { error: 'Name already taken in this room' }

  room.players.push({ id: playerId, name: playerName, score: 0 })
  return room
}

// Remove a player from their room when they disconnect
// Returns the room they were in, or null if not found
function leaveRoom(playerId) {
  for (const code in rooms) {
    const room = rooms[code]
    const index = room.players.findIndex(p => p.id === playerId)

    if (index !== -1) {
      room.players.splice(index, 1)

      // If room is now empty, delete it entirely
      if (room.players.length === 0) {
        delete rooms[code]
        return null
      }

      // If the host left, promote the next player to host
      if (room.hostId === playerId && room.players.length > 0) {
        room.hostId = room.players[0].id
      }

      return room
    }
  }
  return null
}

// Look up a room by code
function getRoom(roomCode) {
  return rooms[roomCode] || null
}

// Look up which room a player is in, by their socket ID
function getRoomByPlayerId(playerId) {
  for (const code in rooms) {
    const room = rooms[code]
    if (room.players.some(p => p.id === playerId)) {
      return room
    }
  }
  return null
}

function getRoomByPlayerId(playerId) {
  for (const code in rooms) {
    if (rooms[code].players.some(p => p.id === playerId)) {
      return rooms[code]
    }
  }
  return null
}

function saveSession(sessionId, name, roomCode) {
  sessions[sessionId] = { name, roomCode }
}

function getSession(sessionId) {
  return sessions[sessionId] || null
}

function clearSession(sessionId) {
  delete sessions[sessionId]
}

function restorePlayer(sessionId, newSocketId) {
  const session = sessions[sessionId]
  if (!session) return null

  const room = rooms[session.roomCode]
  if (!room) {
    delete sessions[sessionId]
    return null
  }

  const existing = room.players.find(p => p.name === session.name)
  if (existing) {
    existing.id = newSocketId
    if (room.hostId === existing.id) room.hostId = newSocketId
    return room
  }

  // Only re-add if game is still in waiting state
  // Don't restore mid-game as it causes state confusion
  if (room.state !== 'WAITING') return null

  room.players.push({ id: newSocketId, name: session.name, score: 0 })
  return room
}

function setRoomMode(roomCode, mode) {
  const room = rooms[roomCode]
  if (!room) return false
  room.mode = mode
  return true
}

module.exports = { createRoom, joinRoom, leaveRoom, getRoom, getRoomByPlayerId, saveSession, getSession, clearSession, restorePlayer, setRoomMode }