// sockets/socketHandler.js
module.exports = (io) => {
  io.on('connection', socket => {
    console.log('Client connected:', socket.id);

    socket.on('cashout_request', (data) => {
      io.emit('player_cashout', data);
    });
  });
};