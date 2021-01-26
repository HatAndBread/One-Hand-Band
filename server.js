const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const clean = require('./db/clean');
require('./db/createTables')();
const PORT = 8080 || process.env.PORT;

const server = require('http').createServer(app);

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  })
);
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

setInterval(clean, 999999);

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}👯‍♀🎺`);
});

module.exports = { server: server };

require('./sockets/socketHandler');
