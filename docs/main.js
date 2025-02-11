const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
statusText.textContent = "Current Player: X";
cells.forEach((cell) => {
  cell.addEventListener("click", function() {
    if (this.textContent === "") {
      this.textContent = currentPlayer;
      if (checkWinner()) {
        statusText.textContent = `${currentPlayer} Wins!`;
        disableBoard();
      } else if ([...cells].every((c) => c.textContent !== "")) {
        statusText.textContent = "It's a Draw!";
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Current Player: ${currentPlayer}`;
      }
    }
  });
});
function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return winningCombos.some((combo) => {
    const [a, b, c] = combo;
    return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
  });
}
function disableBoard() {
  cells.forEach((cell) => cell.disabled = true);
}
resetButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
  });
  currentPlayer = "X";
  statusText.textContent = "Current Player: X";
});
//# sourceMappingURL=main.js.map
