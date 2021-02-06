const express = require('express');
const path = require('path');
const app = express();
const clean = require('./db/clean');
require('./db/createTables')();
const PORT = 8080 || process.env.PORT;
const forceHttps = require('./force-https');
const server = require('http').createServer(app);

app.all('*', forceHttps);

app.use(express.static(path.join(__dirname, 'build')));

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
