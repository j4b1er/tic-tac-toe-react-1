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
  const [userTurn, setUserTurn] = useState("");
  const [userSign, setUserSign] = useState("");

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
            setUserTurn(room.playerStart);
            setUserSign(room.enemySign);
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
      setUserTurn(enemy.playerStart);
      setUserSign(enemy.masterSign);
      // console.log(`${enemy.enemy} joined the room`);
    });
    socket.on("receive_board", (game) => {
      setUserTurn(userName);
      setBoard(game.board);
      setStage(game.stage);
      setWinner(game.winner);
      console.log(game.winner);
      // console.log(`Board received from ${game.user}`);
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
    setUserTurn(enemy);
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
          userName={userName}
          userTurn={userTurn}
          userSign={userSign}
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
