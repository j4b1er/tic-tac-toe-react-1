export default function Button({
  row,
  column,
  userName,
  userTurn,
  userSign,
  value,
  winner,
  playersReady,
  onBoardUpdate,
}) {
  function handleButtonClick() {
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
      disabled={
        playersReady >= 2
          ? userName === userTurn && !value
            ? false
            : true
          : true
      }
      onClick={handleButtonClick}
      aria-checked={value || winner != "" ? true : false}>
      <span className={value !== 0 ? "" : "hidden"}>
        {typeof value === "string" ? value[0] : value}
      </span>
    </button>
  );
}
