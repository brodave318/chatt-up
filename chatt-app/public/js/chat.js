// #154 f
const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML

// #156 a
socket.on('message', message => {
  const html = Mustache.render(messageTemplate, {
    message
  })
  $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', url => {
  console.log(url)
  const html = Mustache.render(locationMessageTemplate, {
    url
  })
  $messages.insertAdjacentHTML('beforeend', html)
})

// #156 b.b
$messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // disable form
  $messageFormButton.setAttribute('disabled', 'disabled')
  // #156 b.c
  const message = e.target.elements.message.value
  // #159
  socket.emit('sendMessage', message, (error) => {
    // enable form
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()

    if (error) {
      return console.log(error)
    }
    console.log('Message delivered')
  })
})


// #158 b
$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser')
  }

  $sendLocationButton.setAttribute('disabled', 'disabled')

  // #158 b.a
  navigator.geolocation.getCurrentPosition(position => {
    // #158 c
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => {
      $sendLocationButton.removeAttribute('disabled')
      console.log('Location shared!')
    })
  })
})
