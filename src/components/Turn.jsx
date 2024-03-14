export default function Turn({ stage, userName, userTurn, userSign, enemy }) {
  const msgTurn = isYourTurn() ? "Your Turn" : `${userTurn}'s Turn`;
  const turn = stage % 2 === 0 ? "X" : "O";
  // const turn = userSign === "X" ? : "O";

  function isYourTurn() {
    return userName === userTurn;
  }

  return (
    <div className="turn">
      <span>{enemy ? msgTurn : `Waiting for enemy...`}</span>
      <div className={`turn-${isYourTurn()}`}>{userSign}</div>
    </div>
  );
}
