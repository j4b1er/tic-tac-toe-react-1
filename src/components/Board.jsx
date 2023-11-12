import { useState } from "react";
import Button from "./Button";

const clearnBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
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

  function checkVerticalLines(newBoard, column) {
    let hArr = [];
    let result = null;
    newBoard.forEach((row) => {
      hArr.push(row[column]);
      if (hArr.length === 3 && checkArraySame(hArr)) {
        result = column + 1;
      }
    });
    return result;
  }

  function checkBackwardsSlash(newBoard) {
    let xArr = [];
    let result = null;
    newBoard.forEach((row, i) => {
      row[i] !== 0 && xArr.push(row[i]);
      if (xArr.length === 3 && checkArraySame(xArr)) {
        result = true;
      }
    });
    return result;
  }

  function checkBoard(newBoard, column) {
    let finalBoard = newBoard;
    let hLine = checkHorizontalLines(newBoard);
    let vLine = checkVerticalLines(newBoard, column);
    let bsLine = checkBackwardsSlash(finalBoard);

    if (hLine) {
      finalBoard = newBoard.map((row, i) =>
        i === hLine - 1 ? row.map(() => 3) : row
      );
    } else if (vLine) {
      finalBoard = newBoard.map((row) =>
        row.map((col, j) => (j === vLine - 1 ? 3 : col))
      );
    } else if (bsLine) {
      finalBoard = newBoard.map((row, i) =>
        row.map((col, j) => (i == j ? 3 : col))
      );
      // console.log(finalBoard);
    }
    setBoard(finalBoard);
  }

  function handleBoardUpdate(value, row, column) {
    const newBoard = board.map((rowValue, i) =>
      i === row
        ? rowValue.map((colValue, j) => (j === column ? value : colValue))
        : rowValue
    );
    checkBoard(newBoard, column);
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
