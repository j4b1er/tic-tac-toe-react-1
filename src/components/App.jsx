import { useEffect, useState } from "react";
import Board from "./Board";
import MainMenu from "./MainMenu";
import GameTitle from "./GameTitle";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import { io } from "socket.io-client";
import Username from "./Username";

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
  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("username")) || ""
  );

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

    socket.on("user_disconnected", (user) => {
      console.log(`${user} disconnected`);
    });
  }, [socket]);

  function createUsername(username) {
    setUserName(username);
    localStorage.setItem("username", JSON.stringify(username));
  }

  function deleteUser() {
    localStorage.removeItem("username");
    setUserName("");
  }

  function createRoom(e) {
    e.preventDefault();
    if (!room) socket.emit("set_room", { id: randomGameId(), user: userName });
  }

  function joinRoom(e, roomEntered) {
    e.preventDefault();
    if (!room) socket.emit("set_room", { id: roomEntered, user: userName });
  }

  function playBoard(board) {
    socket.emit("play_board", { board, stage, winner, room });
  }

  return (
    <div className="app">
      {room === null ? (
        <MainMenu>
          <GameTitle />
          {userName === "" ? (
            <Username onCreateUsername={createUsername} />
          ) : (
            <>
              <CreateRoom
                onCreateRoom={createRoom}
                userName={userName}
                onDeleteUser={deleteUser}
              />
              <JoinRoom onJoinRoom={joinRoom} />
            </>
          )}
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
