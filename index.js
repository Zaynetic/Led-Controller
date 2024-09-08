const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create an Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server);

// Serve the client file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Make sure your HTML file path is correct
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for 'led-command' event from the client
  socket.on('led-command', (data) => {
    console.log(`LED Command: ${data.led}, Intensity: ${data.value}`);
    // Handle LED control logic here (e.g., send it to Arduino via another method)
    // socket.broadcast.emit("controllers-updated", data)
    io.emit("controllers-updated", data)
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
