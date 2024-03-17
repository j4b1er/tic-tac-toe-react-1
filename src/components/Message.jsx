export default function Message({ winner, userName, resetGame }) {
  const resultMsg =
    winner === "tie"
      ? "It is a tie."
      : userName === winner
      ? "You Won!"
      : "You Lost";
  const msgClass =
    winner === "tie"
      ? "tie-msg"
      : userName === winner
      ? "winner-msg"
      : "loser-msg";

  function handleSubmit(e) {
    e.preventDefault();
    resetGame();
  }

  return (
    <form className="messageForm" onSubmit={handleSubmit}>
      <div className="message">
        <p className={msgClass}>{resultMsg}</p>
        <button>Restart</button>
      </div>
    </form>
  );

  // return winner ? (
  //   <form className="messageForm" onSubmit={handleSubmit}>
  //     <div className="message pop-up">
  //       <p>Winner</p>
  //       <p className="winner-msg">{winnerSign}</p>
  //       <button>Restart</button>
  //     </div>
  //   </form>
  // ) : (
  //   stage === 9 && (
  //     <form className="messageForm" onSubmit={handleSubmit}>
  //       <div className="message">
  //         <p>Its a tie!</p>
  //         <button>Restart</button>
  //       </div>
  //     </form>
  //   )
  // );
}
