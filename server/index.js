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

//functions
function randomGameId(min, max) {
  let num = Math.floor(Math.random() * (max - min) + min);
  return roomsArray.includes(num) ? randomGameId(1, 1000000) : num;
}

//variables
let roomsArray = [];

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("set_room", (room) => {
    const roomID = randomGameId(1, 1000000);
    roomsArray.push(roomID);
    socket.emit("room_created", roomID);
    socket.data.user = room.user;
  });

  socket.on("join_room", async (room) => {
    if (roomsArray.includes(room.id)) {
      const roomPlayers = await io.of("/").in(room.id).fetchSockets();

      if (roomPlayers.length < 2) {
        console.log(`connected ${room.user} to room ${room.id}`);
        socket.join(room.id);
        socket.emit("room_joined", { id: room.id, status: 1 });
      } else {
        socket.emit("max_players", room.id);
        console.log("room full");
      }
    } else {
      socket.emit("room_joined", { id: room.id, status: 2 });
    }
  });

  socket.on("play_board", (game) => {
    socket.to(game.room).emit("receive_board", game);
  });

  socket.on("disconnecting", () => {
    let roomsArray = Array.from(socket.rooms);
    const userDisc = socket.data.user;
    if (roomsArray.length >= 2) {
      socket.to(roomsArray[1]).emit("user_disconnected", userDisc);
      // console.log(
      //   `${socket.data.user} disconnected from room ${roomsArray[1]}`
      // );
    }
  });
});

server.listen(3001, () => {
  console.log("server running");
});
