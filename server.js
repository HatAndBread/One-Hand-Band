const express = require('express');
const path = require('path');
const app = express();
const clean = require('./db/clean');
const PORT = process.env.PORT || 8080;
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

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}👯‍♀🎺`);
});

module.exports = { server: server };

require('./sockets/socketHandler');
require('./db/createTables')();
setInterval(clean, 999999);
