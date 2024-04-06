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
function randomNum(min, max, rooms = false) {
  let num = Math.floor(Math.random() * (max - min) + min);
  return rooms
    ? roomsArray.includes(num)
      ? randomNum(1, 1000000, true)
      : num
    : num;
}

//variables
let roomsArray = [];

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  //player creates the room
  socket.on("set_room", (master) => {
    const roomID = randomNum(1, 1000000, true);
    socket.data.user = master.user;
    socket.data.room = roomID;
    roomsArray.push({ id: roomID, master: master.user });
    socket.join(roomID);
    // console.log(`${socket.data.user} created Room ${roomID}`);
    socket.emit("room_created", roomID);
  });

  //2nd player join an existing room
  socket.on("join_room", async (enemy) => {
    const roomObj = roomsArray.filter((obj) => obj.id === enemy.roomId);
    if (roomObj.length) {
      const roomPlayers = await io.of("/").in(enemy.roomId).fetchSockets();
      if (roomPlayers.length < 2) {
        socket.data.user = enemy.user;
        socket.data.room = enemy.roomId;
        socket.join(enemy.roomId);
        //Generate randomly whici player starts. If its 1 its the room master. If its 2 its the 2nd player turn
        const playerTurn =
          randomNum(1, 3) === 1 ? roomObj[0].master : enemy.user;
        const masterSign = randomNum(1, 3) === 1 ? "X" : "O";
        const enemySign = masterSign === "X" ? "O" : "X";
        //send back to Player joining room
        socket.emit("room_joined", {
          id: enemy.roomId,
          master: roomObj[0].master,
          playerStart: playerTurn,
          enemySign,
          status: 1,
        });
        //send to Room Master
        socket.to(enemy.roomId).emit("enemy_joined", {
          enemy: enemy.user,
          playerStart: playerTurn,
          masterSign,
        });
      } else {
        //room full
        socket.emit("room_joined", { id: enemy.roomId, status: 3 });
      }
    } else {
      //room not found
      socket.emit("room_joined", { id: enemy.roomId, status: 2 });
    }
  });

  socket.on("play_board", (game) => {
    socket.to(game.room).emit("receive_board", game);
  });

  socket.on("game_reset", (roomNumber) => {
    socket.to(roomNumber).emit("player_reset");
  });

  //Quitting when pressing leave room button
  socket.on("quit_game", async (gameInfo) => {
    socket.leave(gameInfo.room);
    socket.to(gameInfo.room).emit("player_quit", gameInfo);
    const roomPlayers = await io.of("/").in(gameInfo.room).fetchSockets();
    if (roomPlayers.length === 0) {
      roomsArray = roomsArray.filter((room) => room.id !== gameInfo.room);
    }
  });

  //Quitting when frefreshing or closing browser
  socket.on("disconnecting", async () => {
    //get info about socket and room
    const userDisc = socket.data.user;
    const userRoom = socket.data.room;
    if (userRoom) {
      socket.to(userRoom).emit("user_disconnected", userDisc);
    }
    const roomPlayers = await io.of("/").in(userRoom).fetchSockets();
    if (roomPlayers.length === 1) {
      roomsArray = roomsArray.filter((room) => room.id !== userRoom);
    }
  });
});

server.listen(3001, () => {
  console.log("server running");
});
