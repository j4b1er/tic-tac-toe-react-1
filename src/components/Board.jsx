import { useState } from "react";
import Button from "./Button";

export default function Board() {
  const [stage, setStage] = useState(0);
  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const winMovements = [
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    [
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
    ],
  ];

  const allEqual = (arr) => arr.every((val) => val && val === arr[0]);

  function checkWinningMoves() {
    let result = "none";
    board.forEach((row, i) => {
      if (allEqual(row)) {
        result = i;
        console.log(result);
        return;
      }
    });
  }

  function handleBoardUpdate(value, row, column) {
    const newBoard = board.map((rowValue, i) =>
      i === row
        ? rowValue.map((colValue, j) => (j === column ? value : colValue))
        : rowValue
    );
    setBoard(newBoard);
  }

  checkWinningMoves();

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
