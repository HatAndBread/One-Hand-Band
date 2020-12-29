const server = require('../server').server;

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

console.log('HI!');
io.on('connection', (socket) => {
  console.log('connect');
  socket.emit('hello', 'Hi!');
});
