export default function GameOptions({ quitGame }) {
  function handleQuit(e) {
    e.preventDefault();
    quitGame();
  }

  return (
    <form className="gameOptions">
      <button className="gameOptions___btn" onClick={handleQuit}>
        Leave Room
      </button>
      <div className="gameOptions___timer">10:00</div>
    </form>
  );
}
