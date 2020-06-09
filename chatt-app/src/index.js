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
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const port = process.env.PORT || 3000
// #152 a
const publicDirectoryPath = path.join(__dirname, '../public')

// #152 a
app.use(express.static(publicDirectoryPath))

// #154 c
io.on('connection', (socket) => {
  console.log('Socket.io connected')

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options })

    if (error) {
      return callback(error)
    }

    socket.join(user.room)

    // #156 a
    socket.emit('message', generateMessage('Admin', 'Welcome!'))
    // #157 a.a
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))

    callback()
  })

  // #156 b.c #159
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
    // #159
    const filter = new Filter()

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!!')
    }

    // send to all connected clients
    io.to(user.room).emit('message', generateMessage(user.username, message))
    callback(/*'Delivered'*/)
  })

  // #158 d
  socket.on('sendLocation', (coords, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?=${coords.latitude},${coords.longitude}`))
    callback()
  })

  // #157 a.b
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
    }
  })
})

// #154 a
server.listen(port, () => {
  console.log(`Server is RRRUUUNNNIIINNNGG on port ${port}`)
})