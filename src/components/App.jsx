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
  const [winner, setWinner] = useState("");
  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("username")) || ""
  );
  const [enemy, setEnemy] = useState("");
  const [userTurn, setUserTurn] = useState("");
  const [userSign, setUserSign] = useState("");
  const [playersReady, setPlayersReady] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!room) {
      socket.on("room_created", (room) => {
        setRoom(room);
        setPlayersReady(1);
      });
      socket.on("room_joined", (room) => {
        switch (room.status) {
          case 1:
            setRoom(room.id);
            setEnemy(room.master);
            setUserTurn(room.playerStart);
            setUserSign(room.enemySign);
            setPlayersReady(2);
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
      // if (!gameStart) setGameStart(true);
      setEnemy(enemy.enemy);
      setUserTurn(enemy.playerStart);
      setUserSign(enemy.masterSign);
      setPlayersReady(2);
      // console.log(`${enemy.enemy} joined the room`);
    });
    socket.on("receive_board", (game) => {
      setUserTurn(userName);
      setBoard(game.board);
      setWinner(game.winner);
      // setGameStart(game.winner === "");
      setPlayersReady((value) => (game.winner === "" ? value : 0));
      // console.log(`Board received from ${game.user}`);
    });
    socket.on("player_reset", () => {
      setBoard(cleanBoard);
      // setGameStart(true);
      setPlayersReady((value) => value + 1);
    });
    socket.on("player_quit", (gameInfo) => {
      setBoard(cleanBoard);
      setEnemy("");
      setUserSign("");
      setUserTurn("");
      // setGameStart(false);
      setPlayersReady(1);
      setMessage(`Enemy ${gameInfo.userLeaving} left the Room`);
    });

    socket.on("user_disconnected", (user) => {
      setBoard(cleanBoard);
      setEnemy("");
      setUserSign("");
      setUserTurn("");
      // setGameStart(false);
      setPlayersReady(1);
      setMessage(`Enemy ${user} left the Room`);
      // console.log(`${user} disconnected`);
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
    // if (!gameStart) setGameStart(true);
  }

  function playBoard(board, userWinner = "") {
    setUserTurn(enemy);
    setWinner(userWinner);
    // if (userWinner !== "") setGameStart(false);
    if (userWinner !== "") setPlayersReady(0);
    socket.emit("play_board", {
      board,
      winner: userWinner,
      room,
      user: userName,
    });
  }

  function resetGame() {
    setBoard(cleanBoard);
    setWinner("");
    // setPlayersReady((value) => (value === 0 ? 1 : 2));
    setPlayersReady((value) => value + 1);
    socket.emit("game_reset", room);
  }

  function quitGame() {
    setRoom(null);
    setBoard(cleanBoard);
    setWinner("");
    setEnemy("");
    setUserTurn("");
    setUserSign("");
    // setGameStart(false);
    setPlayersReady(0);
    socket.emit("quit_game", { room, userLeaving: userName });
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
          winner={winner}
          playersReady={playersReady}
          message={message}
          setBoard={setBoard}
          playBoard={playBoard}
          resetGame={resetGame}
          quitGame={quitGame}
        />
      )}
    </div>
  );
}
