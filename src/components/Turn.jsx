export default function Turn({ stage, userName, userTurn, userSign, enemy }) {
  const turn = stage % 2 === 0 ? "X" : "O";
  // const turn = userSign === "X" ? : "O";

  return (
    <div className="turn">
      <span>{enemy ? `${userTurn}'s Turn` : `Waiting for enemy...`}</span>
      <div className={stage % 2 === 0 ? "turn-x" : "turn-o"}>{userSign}</div>
    </div>
  );
}
