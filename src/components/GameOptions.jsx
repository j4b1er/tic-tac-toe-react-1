import { useEffect, useState } from "react";

export default function GameOptions({
  userName,
  userTurn,
  playersReady,
  currentBoard,
  quitGame,
  playBoard,
}) {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (playersReady >= 2 && userName === userTurn) {
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
  }, [seconds, userName, userTurn, playersReady, currentBoard, playBoard]);

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
