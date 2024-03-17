import { useState } from "react";

export default function Button({
  row,
  column,
  userName,
  userTurn,
  userSign,
  value,
  winner,
  onBoardUpdate,
}) {
  // const [celValue, setCelValue] = useState(0);

  function handleButtonClick() {
    // let innerValue = stage % 2 === 0 ? "X" : "O";
    // let outterValue = stage % 2 === 0 ? 1 : 2;
    // setCelValue(innerValue);
    // setCelValue(userSign);
    // onBoardUpdate(outterValue, row, column);
    onBoardUpdate(userSign, row, column);
  }

  return (
    <button
      className={
        typeof value === "string" && value.includes("3")
          ? "btn winner"
          : value === "X"
          ? "btn turn-x"
          : value === "O"
          ? "btn turn-o"
          : "btn"
      }
      disabled={userName === userTurn && !value ? false : true}
      onClick={value === 0 && winner === "" ? handleButtonClick : () => {}}
      aria-checked={value || winner != "" ? true : false}>
      <span className={value !== 0 ? "" : "hidden"}>
        {/* {value === 1 ? "X" : value === 2 ? "O" : 0} */}
        {typeof value === "string" ? value[0] : value}
      </span>
    </button>
  );
}
