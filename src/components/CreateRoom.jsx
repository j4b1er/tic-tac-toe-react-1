export default function CreateRoom({ onCreateRoom, userName, onDeleteUser }) {
  function handleLogout(e) {
    e.preventDefault();
    onDeleteUser();
  }

  return (
    <>
      <form className="userInfo" onSubmit={handleLogout}>
        <span>{`Hi, ${userName}`}</span>
        <button>Logout</button>
      </form>
      <form className="createGameForm" onSubmit={onCreateRoom}>
        <button>Create a Room</button>
      </form>
    </>
  );
}
