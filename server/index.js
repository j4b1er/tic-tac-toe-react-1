import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("set_room", async (room) => {
    await socket.join(room.id);
    socket.emit("room_created", room.id);
    console.log(`connected ${socket.id} to room ${room.id}`);
  });

  socket.on("play_board", (game) => {
    socket.to(game.room).emit("receive_board", game.board);
    // console.log(game.board);
  });
});

server.listen(3001, () => {
  console.log("server running");
});
