const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
  console.log('Socket.io connected')

  socket.emit('message', "Welcome to Chatt App")
  // send to everyone except the current client
  socket.broadcast.emit('message', 'A new user has joined!')

  socket.on('sendMessage', message => {
    io.emit('message', message)
  })

  // sends meesage of diconnected client
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!')
  })
})

server.listen(port, () => {
  console.log(`Server is RRRUUUNNNIIINNNGG on port ${port}`)
})