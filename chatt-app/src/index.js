const path = require('path')
// #154 a
const http = require('http')
const express = require('express')
// #154 b
const socketio = require('socket.io')

const app = express()
// #154 a
const server = http.createServer(app)
// #154 b
const io = socketio(server)
// #159
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const port = process.env.PORT || 3000
// #152 a
const publicDirectoryPath = path.join(__dirname, '../public')

// #152 a
app.use(express.static(publicDirectoryPath))

// #154 c
io.on('connection', (socket) => {
  console.log('Socket.io connected')

  socket.on('join', ({ username, room }) => {
    socket.join(room)

    // #156 a
    socket.emit('message', generateMessage('Welcome!'))
    // #157 a.a
    socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))
  })

  // #156 b.c #159
  socket.on('sendMessage', (message, callback) => {
    // #159
    const filter = new Filter()
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!!')
    }
    // send to all connected clients
    io.emit('message', generateMessage(message))
    callback(/*'Delivered'*/)
  })

  // #158 d
  socket.on('sendLocation', (coords, callback) => {
    io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?=${coords.latitude},${coords.longitude}`))
    callback()
  })

  // #157 a.b
  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A user has left!'))
  })
})

// #154 a
server.listen(port, () => {
  console.log(`Server is RRRUUUNNNIIINNNGG on port ${port}`)
})