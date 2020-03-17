const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(3000);
app.use(express.static('client'));

const io = socket(server);
io.sockets.on("connection", (socket) => {
  socket.on('coord', (data) => {
    socket.broadcast.emit('coord', data);
  });
});
