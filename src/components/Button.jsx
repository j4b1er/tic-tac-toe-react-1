import { useState } from "react";

export default function Button({
  row,
  column,
  userName,
  userTurn,
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
      className={
        value === 3
          ? "btn winner"
          : value === 1
          ? "btn turn-x"
          : value === 2
          ? "btn turn-o"
          : "btn"
      }
      disabled={userName === userTurn ? false : true}
      onClick={celValue === 0 && winner === 0 ? handleButtonClick : () => {}}
      aria-checked={celValue || winner ? true : false}>
      <span className={value !== 0 ? "" : "hidden"}>
        {value === 1 ? "X" : value === 2 ? "O" : 0}
      </span>
    </button>
  );
}
