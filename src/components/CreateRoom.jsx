// function randomGameId() {
//   return Math.floor(Math.random() * 10000000);
// }

export default function CreateRoom({ onCreateRoom }) {
  return (
    <form className="createGameForm" onSubmit={onCreateRoom}>
      <button className="createGame">Create a Room</button>
    </form>
  );
}
