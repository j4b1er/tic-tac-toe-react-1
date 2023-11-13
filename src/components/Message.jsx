export default function Message({ winner, stage }) {
  const winnerSign = winner === 1 ? "X" : "O";

  return winner ? (
    <form>
      <div className="message pop-up">
        <p>Winner</p>
        <p className="winner-msg">{winnerSign}</p>
        <button>Restart</button>
      </div>
    </form>
  ) : (
    stage === 9 && (
      <form>
        <div className="message">
          <p>Its a tie!</p>
          <button>Restart</button>
        </div>
      </form>
    )
  );
}
