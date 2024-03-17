export default function Turn({ userName, userTurn, userSign, enemy }) {
  const msgTurn = isYourTurn() ? "Your Turn" : `${userTurn}'s Turn`;

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
