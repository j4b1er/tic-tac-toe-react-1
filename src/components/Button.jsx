import { useState } from "react";

export default function Button({
  row,
  column,
  value,
  stage,
  setStage,
  onBoardUpdate,
}) {
  function handleButtonClick() {
    setStage(stage + 1);
    value = stage % 2 === 0 ? "X" : "O";
    onBoardUpdate(value, row, column);
  }

  return (
    <button
      className="btn"
      onClick={value === 0 ? handleButtonClick : () => {}}
      aria-checked={value ? true : false}>
      <span className={value ? "" : "hidden"}>{value}</span>
    </button>
  );
}
