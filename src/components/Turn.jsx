export default function Turn({ stage, userName, userTurn, userSign, enemy }) {
  const msgTurn = isYourTurn() ? "Your Turn" : `${userTurn}'s Turn`;
  // const turn = stage % 2 === 0 ? "X" : "O";

  function isYourTurn() {
    return userName === userTurn;
  }

  return (
    <div className="turn">
      <span>{enemy ? msgTurn : `Waiting for opponent...`}</span>
      <div className={`turn-${isYourTurn()}`}>{userSign}</div>
    </div>
  );
}
