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

// #158 b
document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser')
  }

  // #158 b.a
  navigator.geolocation.getCurrentPosition(position => {
    // #158 c
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  })


})
