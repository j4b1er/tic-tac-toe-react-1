export default function Message({ winner, userName, resetGame, quitGame }) {
  const resultMsg =
    winner === "tie"
      ? "It's a tie."
      : userName === winner
      ? "You Won!"
      : "You Lost.";
  const msgClass =
    winner === "tie"
      ? "tie-msg"
      : userName === winner
      ? "winner-msg"
      : "loser-msg";

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.children);
    // resetGame();
  }

  function handleRestart(e) {
    e.preventDefault();
    resetGame();
  }

  function handleQuit(e) {
    e.preventDefault();
    quitGame();
  }

  return (
    <form className="messageForm">
      <div className="message">
        <p className={msgClass}>{resultMsg}</p>
        <button onClick={handleRestart}>Restart</button>
        <button onClick={handleQuit}>Quit</button>
      </div>
    </form>
  );
}
