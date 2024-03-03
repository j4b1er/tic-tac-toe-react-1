import { useEffect, useState } from "react";
import Board from "./Board";
import MainMenu from "./MainMenu";
import GameTitle from "./GameTitle";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

export default function App() {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    socket.emit("set_room", { room });
  }, [room, setRoom]);

  return (
    <div className="app">
      {room === null ? (
        <MainMenu>
          <GameTitle />
          <CreateRoom onSetRoom={setRoom} />
          <JoinRoom onSetRoom={setRoom} />
        </MainMenu>
      ) : (
        <Board roomNum={room} />
      )}
    </div>
  );
}
