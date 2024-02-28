export default function Message({ winner, stage, resetGame }) {
  const winnerSign = winner === 1 ? "X" : "O";

  function handleSubmit(e) {
    e.preventDefault();
    resetGame();
  }

  return winner ? (
    <form onSubmit={handleSubmit}>
      <div className="message pop-up">
        <p>Winner</p>
        <p className="winner-msg">{winnerSign}</p>
        <button>Restart</button>
      </div>
    </form>
  ) : (
    stage === 9 && (
      <form onSubmit={handleSubmit}>
        <div className="message">
          <p>Its a tie!</p>
          <button>Restart</button>
        </div>
      </form>
    )
  );
}
