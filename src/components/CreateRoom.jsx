function randomGameId() {
  return Math.floor(Math.random() * 10000000);
}

export default function CreateRoom({ onSetRoom }) {
  return (
    <button className="createGame" onClick={() => onSetRoom(randomGameId)}>
      Create a Room
    </button>
  );
}
