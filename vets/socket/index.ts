const express = require("express");
const http = require("http");
const { Server, Socket } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }  // Allow cross-origin for testing
});

io.on("connection", (socket: typeof Socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data: typeof Socket) => {
    console.log("Received message:", data);
    io.emit("receive_message", data);  // Send to everyone (broadcast)
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server running on port 3001");
});
