import { useState } from "react";

export default function Button({
  row,
  column,
  value,
  stage,
  winner,
  setStage,
  onBoardUpdate,
}) {
  const [celValue, setCelValue] = useState(0);

  function handleButtonClick() {
    setStage(stage + 1);
    let innerValue = stage % 2 === 0 ? "X" : "O";
    let outterValue = stage % 2 === 0 ? 1 : 2;
    setCelValue(innerValue);
    onBoardUpdate(outterValue, row, column);
  }

  return (
    <button
      className={value === 3 ? "btn winner" : "btn"}
      onClick={celValue === 0 && winner === 0 ? handleButtonClick : () => {}}
      aria-checked={celValue || winner ? true : false}>
      <span className={celValue ? "" : "hidden"}>{celValue}</span>
    </button>
  );
}
