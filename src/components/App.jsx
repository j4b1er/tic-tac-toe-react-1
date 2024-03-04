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
  const [stage, setStage] = useState(0);
  const [winner, setWinner] = useState(0);

  useEffect(() => {
    if (!room) {
      socket.on("max_players", (room) => {
        console.log(`The room ${room} is full`);
      });
      socket.on("room_created", (room) => {
        setRoom(room);
      });
    }
    socket.on("receive_board", (game) => {
      setBoard(game.board);
      setStage(game.stage);
      setWinner(game.winner);
    });
  }, [socket]);

  function createRoom(e) {
    e.preventDefault();
    if (!room) socket.emit("set_room", { id: randomGameId() });
  }

  function joinRoom(e, roomEntered) {
    e.preventDefault();
    if (!room) socket.emit("set_room", { id: roomEntered });
  }

  function playBoard(board) {
    socket.emit("play_board", { board, stage, winner, room });
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
          stage={stage}
          setStage={setStage}
          winner={winner}
          setWinner={setWinner}
          playBoard={playBoard}
        />
      )}
    </div>
  );
}
