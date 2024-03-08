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

export default function App() {
  const [room, setRoom] = useState(null);
  const [board, setBoard] = useState(cleanBoard);
  const [stage, setStage] = useState(0);
  const [winner, setWinner] = useState(0);
  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("username")) || ""
  );
  const [enemy, setEnemy] = useState("");

  useEffect(() => {
    if (!room) {
      socket.on("room_created", (room) => {
        setRoom(room);
      });
      socket.on("room_joined", (room) => {
        switch (room.status) {
          case 1:
            setRoom(room.id);
            setEnemy(room.master);
            break;
          case 2:
            console.log("Room not found");
            break;
          case 3:
            console.log(`The Room ${room.id} is full`);
            break;
        }
      });
    }
    socket.on("enemy_joined", (enemy) => {
      setEnemy(enemy.enemy);
      console.log(`${enemy.enemy} joined the room`);
    });
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
    if (!room)
      socket.emit("set_room", {
        user: userName,
      });
  }

  function joinRoom(roomEntered) {
    if (!room)
      socket.emit("join_room", { roomId: roomEntered, user: userName });
  }

  function playBoard(board) {
    socket.emit("play_board", { board, stage, winner, room, user: userName });
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
          enemy={enemy}
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
