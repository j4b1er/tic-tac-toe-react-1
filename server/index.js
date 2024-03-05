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
    const roomPlayers = await io.of("/").in(room.id).fetchSockets();

    if (roomPlayers.length < 2) {
      console.log(`connected ${socket.id} to room ${room.id}`);
      socket.join(room.id);
      socket.emit("room_created", room.id);
    } else {
      socket.emit("max_players", room.id);
      console.log("room full");
    }
  });

  socket.on("play_board", (game) => {
    socket.to(game.room).emit("receive_board", game);
  });

  socket.on("disconnecting", () => {
    let roomsArray = Array.from(socket.rooms);
    // if(roomsArray.length < )
  });
});

server.listen(3001, () => {
  console.log("server running");
});
