const server = require('../server').server;
const generatePin = require('./generatePin');
const Session = require('./Session');
const User = require('./User');

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
  socket.on('getSocketId', () => {
    io.to(socket.id).emit('getSocketId', socket.id);
  });
  socket.on('getPin', async () => {
    console.log(`Someone with id ${socket.id} created a pin!`);
    const pin = generatePin();
    const session = new Session({ pin: pin, host: socket.id, users: [] });
    console.log(`This is a new session: ${session}`);
    console.log(session);
    try {
      await session.create();
      socket.join(pin);
    } catch (err) {
      console.log(err);
    }
    try {
      await session.create();
      socket.join(pin);
      const newUser = await session.addUser(socket.id, pin);
      io.to(socket.id).emit('getPin', newUser, session);
    } catch (err) {
      console.log(err);
    }
  });
  socket.on('joinSession', (pin) => {
    Session.findByPin(pin).then(
      async (session) => {
        if (session.users.length >= 4) {
          io.to(socket.id).emit('tooManyMessage');
        } else {
          const newUser = await session.addUser(socket.id, pin);
          socket.join(pin);
          io.to(socket.id).emit('joinSuccess', newUser);
          io.in(pin).emit('newMember', session);
        }
      },
      (reason) => {
        console.log('rejected because' + reason);
        io.to(socket.id).emit('joinFailure');
      }
    );
  });
  socket.on('musicData', (musicData, pin, user) => {
    console.log('MUSIC DATA');
    console.log(musicData);
    console.log(user);
    io.in(pin).emit('musicData', musicData, user);
  });
  socket.on('instrumentChange', async (instrument, pin, userName) => {
    const updatedUser = new User({
      userName: userName,
      socketId: socket.id,
      pin: pin,
      instrument: instrument
    });
    console.log('UPdated user: ');
    console.log(updatedUser);
    try {
      await User.update(updatedUser, pin, userName);
      Session.findByPin(pin).then(
        (session) => {
          io.in(pin).emit('instrumentChange', session);
        },
        (rejectReason) => {
          console.error(rejectReason);
        }
      );
    } catch (err) {
      return console.error(err);
    }
  });
  socket.on('settingsChange', (settings, socketId, instrument, sessionPin) => {
    console.log('SETTINGS CHANGE!');
    console.log(settings, socketId, instrument, sessionPin);
    socket.to(sessionPin).emit('settingsChange', settings, socketId, instrument, sessionPin);
  });
  socket.on('effectsChange', (effects, socketId, instrument, sessionPin) => {
    console.log('effects CHANGE!');
    console.log(effects, socketId, instrument, sessionPin);
    socket.to(sessionPin).emit('effectsChange', effects, socketId, instrument, sessionPin);
  });
});
