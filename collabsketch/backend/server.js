const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });
  socket.on('clear', () => {
    io.emit('clear');
  });
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

httpServer.listen(3001, () => {
  console.log('WebSocket server running on http://localhost:3001');
});