const server = require('../server').server;
const generatePin = require('./generatePin');
const Session = require('./Session');

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log(`Somebody connected with id: ${socket.id}`);
  socket.emit('hello', 'Hi!');
  socket.on('getPin', () => {
    console.log(`Someone with id ${socket.id} created a pin!`);
    const pin = generatePin();
    const session = new Session({ pin: pin, host: socket.id, users: [] });
    console.log(`This is a new session: ${session}`);
    console.log(session);
    session.create();
    io.to(socket.id).emit('getPin', pin);
  });
  socket.on('joinSession', (pin) => {
    Session.findByPin(pin).then(
      (session) => {
        const newUser = session.addUser(socket.id, pin);
        io.to(socket.id).emit('joinSuccess', newUser);
      },
      (reason) => {
        console.log('rejected because' + reason);
        io.to(socket.id).emit('joinFailure');
      }
    );
  });
});
