import { useEffect, useState } from "react";

export default function Turn({
  userName,
  userTurn,
  userSign,
  enemy,
  message,
  playersReady,
}) {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setMsg(message);
    const timeoutMsg = setTimeout(() => {
      if (message) {
        setMsg(`Waiting for opponent...`);
      }
    }, 2000);

    return () => clearTimeout(timeoutMsg);
  }, [message]);

  const msgTurn = isYourTurn() ? "Your Turn" : `${userTurn}'s Turn`;

  function isYourTurn() {
    return userName === userTurn;
  }

  return (
    <div className="turn">
      <span>
        {enemy
          ? playersReady >= 2
            ? msgTurn
            : `Waiting for ${enemy}`
          : message
          ? msg
          : `Waiting for opponent...`}
      </span>
      <div
        className={playersReady === 2 ? `turn-${isYourTurn()}` : "turn-false"}>
        {enemy ? (
          playersReady === 2 ? (
            userSign
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
            </svg>
          )
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
          </svg>
        )}
      </div>
    </div>
  );
}
