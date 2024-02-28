import { useState } from "react";
import Board from "./Board";
import MainMenu from "./MainMenu";
import GameTitle from "./GameTitle";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";

export default function App() {
  const [room, setRoom] = useState(null);

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
