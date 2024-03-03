import { useEffect, useState } from "react";
import Board from "./Board";
import MainMenu from "./MainMenu";
import GameTitle from "./GameTitle";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const cleanBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function randomGameId() {
  return Math.floor(Math.random() * 10000000);
}

export default function App() {
  const [room, setRoom] = useState(null);
  const [board, setBoard] = useState(cleanBoard);

  useEffect(() => {
    if (!room) {
      socket.on("room_created", (room) => {
        setRoom(room);
      });
    }
    socket.on("receive_board", (board) => {
      setBoard(board);
    });
  }, [socket]);

  // useEffect(() => {
  //   socket.emit("play_board", { board, room });
  // }, [board]);

  function createRoom(e) {
    e.preventDefault();
    if (!room) socket.emit("set_room", { id: randomGameId() });
  }

  function joinRoom(e, roomEntered) {
    e.preventDefault();
    if (!room) socket.emit("set_room", { id: roomEntered });
  }

  function playBoard(board) {
    socket.emit("play_board", { board, room });
  }

  return (
    <div className="app">
      {room === null ? (
        <MainMenu>
          <GameTitle />
          <CreateRoom onCreateRoom={createRoom} />
          <JoinRoom onJoinRoom={joinRoom} />
        </MainMenu>
      ) : (
        <Board
          roomNum={room}
          board={board}
          setBoard={setBoard}
          playBoard={playBoard}
        />
      )}
    </div>
  );
}
