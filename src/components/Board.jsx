import { useState } from "react";
import Button from "./Button";

const clearnBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const winMovements = [
  [1, 1, 1],
  [2, 2, 2],
];

export default function Board() {
  const [stage, setStage] = useState(0);
  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState(clearnBoard);

  function checkArraySame(arr) {
    return arr.every((val) => val && val === arr[0]);
  }

  function checkHorizontalLines(newBoard) {
    let result = null;
    newBoard.forEach((row, i) => {
      if (checkArraySame(row)) {
        result = i + 1;
        return;
      }
    });
    return result;
  }

  function checkVerticalLines(newBoard) {}

  function checkBoard(newBoard) {
    let hLine = checkHorizontalLines(newBoard);
    if (hLine) {
      const finalBoard = board.map((row, i) =>
        i === hLine - 1 ? row.map(() => 3) : row
      );
      setBoard(finalBoard);
    } else {
      setBoard(newBoard);
    }
  }

  function handleBoardUpdate(value, row, column) {
    const newBoard = board.map((rowValue, i) =>
      i === row
        ? rowValue.map((colValue, j) => (j === column ? value : colValue))
        : rowValue
    );
    checkBoard(newBoard);
  }

  return (
    <div className="board">
      {board.map((rowValue, row) =>
        rowValue.map((colValue, col) => (
          <Button
            key={`${row}${col}`}
            row={row}
            column={col}
            value={colValue}
            stage={stage}
            setStage={setStage}
            onBoardUpdate={handleBoardUpdate}
          />
        ))
      )}
    </div>
  );
}
