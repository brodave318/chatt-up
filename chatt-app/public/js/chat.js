// #154 f
const socket = io()

// #156 a
socket.on('message', message => {
  console.log(message)
})

// #156 b.b
document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault()

  // #156 b.c
  const message = e.target.elements.message.value
  socket.emit('sendMessage', message)
})