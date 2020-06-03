/**
 * ******************************
 *  #152 -- src/index.js
 * ******************************
 * Basic Setup:
 * Initialize npm
 * Install Express
 * Setup Express server
 * > Serve up public directory (require path)
 * > Listen on port 3000
 * Create index.html
 * > Render "Chat App" message
 * Setup scripts in package.json
 * > Create "start" script using node
 * > Create "dev" script using nodemon
 * ******************************
 *  #154 -- public/index.html, public/js/chat.js, src/index.js
 * ******************************
 * Setup Websocket Support for Server:
 * > Install socket.io
 * > Refactor server
 * > Require & configure it to work with server
 * Configure it to work with connected client:
 * > Create HTML & insert script <script src="/socket.io/socket.io.js"></script> im public folder
 * > Create js/char.js file in public folder & link to it
 * > Connect to server
 * ******************************
 *  #156 -- public/index.html, public/js/chat.js, src/index.js
 * ******************************
 * Send message to newly connected
 * Allow client to send messages to each other:
 * > Add form to html with button
 * > Setuo event listeners for form submissions
 * > Have server listen for "sendMessage"
 * ******************************
 *  #157 -- src/index.js,
 * ******************************
 * Broadcast send messages to everyone but user:
 * > Send message when a user joins
 * > Send message when a user leaves
 * ******************************
 *  #158 -- public/index.html, public/js/chat.js, src/index.js
 * ******************************
 * Setup to share user's location using browser geolocation API
 * Create button to share location on HTML
 * Add click event on chat.js
 * > Get current location
 * Have client emit "sendLocation" with an object containing latitude & longitude
 * Have server listen for "sendLocation" and send Google Maps link with coordinates
 * ******************************
 *  #159 -- public/js/chat.js, src/index.js
 * ******************************
 * Setup acknowledgements
 * Restrict profanity
 * > npm install bad-words
 * > Require it
 * > Initialize it
 * ******************************
 *  #160 -- public/js/chat.js, src/index.js
 * ******************************
 * Improve button interaction
 */