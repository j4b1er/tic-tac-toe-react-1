import { useEffect, useState } from "react";

export default function GameOptions({
  userName,
  userTurn,
  gameStart,
  currentBoard,
  quitGame,
  playBoard,
}) {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (gameStart && userName === userTurn) {
      if (seconds > 0) {
        const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        return () => {
          clearTimeout(timer);
        };
      } else {
        playBoard(currentBoard);
        console.log("time is up");
      }
    } else {
      setSeconds(10);
    }
  }, [seconds, userName, userTurn, gameStart, currentBoard, playBoard]);

  function handleQuit(e) {
    e.preventDefault();
    quitGame();
  }

  return (
    <form className="gameOptions">
      <button className="gameOptions___btn" onClick={handleQuit}>
        Leave Room
      </button>
      <div className="gameOptions___timer">{seconds}s</div>
    </form>
  );
}
