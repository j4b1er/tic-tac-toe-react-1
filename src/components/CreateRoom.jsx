// function randomGameId() {
//   return Math.floor(Math.random() * 10000000);
// }

export default function CreateRoom({ onCreateRoom, userName }) {
  return (
    <form className="createGameForm" onSubmit={onCreateRoom}>
      {/* <input
        type="text"
        name="user"
        id="user"
        placeholder="Username..."
        autoComplete="off"
      /> */}
      <button>Create a Room</button>
    </form>
  );
}
