import { useState } from "react";

export default function JoinRoom({ onSetRoom }) {
  const [roomInput, setRoomInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSetRoom(Number(roomInput));
  }

  return (
    <>
      <div className="joinTitle">Join a Room</div>
      <form className="joinGame" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room number..."
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
        />
        <button>Join</button>
      </form>
    </>
  );
}
