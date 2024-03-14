import { useState } from "react";
import Button from "./Button";
import Turn from "./Turn";
import Message from "./Message";
import Room from "./Room";

export default function Board({
  roomNum,
  enemy,
  board,
  userName,
  userTurn,
  userSign,
  stage,
  setStage,
  winner,
  setWinner,
  setBoard,
  playBoard,
}) {
  // const [stage, setStage] = useState(0);
  // const [winner, setWinner] = useState(0);
  // const [board, setBoard] = useState(cleanBoard);

  function resetGame() {
    setStage(0);
    setWinner(0);
    // setBoard(cleanBoard);
    // setGameID(randomGameId);
  }

  /**
   *
   * @param {Array} arr one dimentional array to check if values are the same
   * @returns true or false
   */
  function checkArraySame(arr) {
    return arr.every((val) => val && val === arr[0]);
  }

  /**
   *
   * @param {Array} newBoard Updated array to be checked
   * @param {Number} row The row where the clicked happened so the function only checks that specific row
   * @returns the row back if there are at least 3 values and they are all the same
   */
  function checkHorizontalLines(newBoard, row) {
    let result =
      newBoard[row].length === 3 && checkArraySame(newBoard[row])
        ? row + 1
        : null;
    return result;
  }

  /**
   *
   * @param {Array} newBoard Updated array to be checked
   * @param {Number} column The column where the click happened so the function only checks that specific column
   * @returns the column back if there are at least 3 values and they are all the same
   */
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

  /**
   *
   * @param {Array} newBoard Updated array to be checked
   * @returns true of false if there are at least 3 values and they are all the same
   */
  function checkBackwardsSlash(newBoard) {
    let bsArr = [];
    let result = false;
    newBoard.forEach((row, i) => {
      row[i] !== 0 && bsArr.push(row[i]);
      if (bsArr.length === 3 && checkArraySame(bsArr)) {
        result = true;
        return;
      }
    });
    return result;
  }

  /**
   *
   * @param {Array} newBoard Updated array to be checked
   * @returns true of false if there are at least 3 values and they are all the same
   */
  function checkForwardSlash(newBoard) {
    let fsArr = [];
    let result = false;
    newBoard.forEach((row, i) =>
      row.forEach((col, j) => {
        if (
          (i === 1 && j === 1) ||
          (i === 0 && j === 2) ||
          (i === 2 && j === 0)
        ) {
          col !== 0 && fsArr.push(col);
        }
        if (fsArr.length === 3 && checkArraySame(fsArr)) {
          result = true;
          return;
        }
      })
    );
    return result;
  }

  /**
   *
   * @param {Array} newBoard Updated array
   * @param {Number} column The column where the click happened
   * @param {Number} row The row where the click happened
   * @param {Number} value The number repesenting the user play 1 = X and 2 = O
   */
  function checkBoard(newBoard, column, row, value) {
    let finalBoard = newBoard;
    const hLine = checkHorizontalLines(newBoard, row);
    const vLine = checkVerticalLines(newBoard, column);
    const bsLine = checkBackwardsSlash(newBoard);
    const fsLine = checkForwardSlash(newBoard);

    if (hLine) {
      finalBoard = newBoard.map((row, i) =>
        i === hLine - 1 ? row.map(() => 3) : row
      );
      setWinner(value);
    } else if (vLine) {
      finalBoard = newBoard.map((row) =>
        row.map((col, j) => (j === vLine - 1 ? 3 : col))
      );
      setWinner(value);
    } else if (bsLine) {
      finalBoard = newBoard.map((row, i) =>
        row.map((col, j) => (i == j ? 3 : col))
      );
      setWinner(value);
    } else if (fsLine) {
      finalBoard = newBoard.map((row, i) =>
        row.map((col, j) =>
          (i === 1 && j === 1) || (i === 0 && j === 2) || (i === 2 && j === 0)
            ? 3
            : col
        )
      );
      setWinner(value);
    }
    setBoard(finalBoard);
    playBoard(finalBoard);
  }

  /**
   *
   * @param {Number} value The number repesenting the user play 1 = X and 2 = O
   * @param {Number} row The row where the click happened
   * @param {Number} column The column where the click happened
   */
  function handleBoardUpdate(value, row, column) {
    const newBoard = board.map((rowValue, i) =>
      i === row
        ? rowValue.map((colValue, j) => (j === column ? value : colValue))
        : rowValue
    );
    checkBoard(newBoard, column, row, value);
  }

  return (
    <>
      <Room room={roomNum} />
      <Turn
        stage={stage}
        userName={userName}
        userTurn={userTurn}
        userSign={userSign}
        enemy={enemy}
      />
      <Message winner={winner} stage={stage} resetGame={resetGame} />
      <div className="board">
        {board.map((rowValue, row) =>
          rowValue.map((colValue, col) => (
            <Button
              key={`${row}${col}${roomNum}`}
              row={row}
              column={col}
              userName={userName}
              userTurn={userTurn}
              value={colValue}
              stage={stage}
              winner={winner}
              setStage={setStage}
              onBoardUpdate={handleBoardUpdate}
            />
          ))
        )}
      </div>
    </>
  );
}
