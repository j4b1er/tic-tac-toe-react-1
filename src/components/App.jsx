import { useState } from "react";
import Board from "./Board";
import RoomNumber from "./Room";

export default function App() {
  const [room, setRoom] = useState(null);

  return (
    <div className="app">{room === null ? <RoomNumber /> : <Board />}</div>
  );
}
