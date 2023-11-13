export default function Turn({ stage }) {
  const turn = stage % 2 === 0 ? "X" : "O";

  return (
    <div className="turn">
      <span>TURN</span>
      <div className={stage % 2 === 0 ? "turn-x" : "turn-o"}>{turn}</div>
    </div>
  );
}
