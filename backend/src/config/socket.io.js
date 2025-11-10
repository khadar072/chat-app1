import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // fixed array syntax
  }
})

export function getScoketMessageId(userId){
return userSocketMap[userId]
}

let userSocketMap = {}

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id)

  const userId = socket.handshake.query.userId
  if (userId) {
    userSocketMap[userId] = socket.id
  }

  // broadcast online users
  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  // ✅ Correct disconnect handler
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id)

    // remove the disconnected socket
    for (const id in userSocketMap) {
      if (userSocketMap[id] === socket.id) {
        delete userSocketMap[id]
        console.log('🧹 Removed user:', id)
        break
      }
    }

    // broadcast updated online users
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { io, server, app }
