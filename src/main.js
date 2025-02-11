var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var currentPlayer = "X";
var cells = document.querySelectorAll(".cell");
var status = document.getElementById("status");
var resetButton = document.getElementById("reset");
// Handle cell clicks
cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
        if (this.textContent === "") {
            this.textContent = currentPlayer;
            if (checkWinner()) {
                status.textContent = currentPlayer + " Wins!";
                disableBoard();
            }
            else if (__spreadArray([], cells, true).every(function (c) { return c.textContent !== ""; })) {
                status.textContent = "It's a Draw!";
            }
            else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = "Current Player: " + currentPlayer;
            }
        }
    });
});
// Check if there's a winner
function checkWinner() {
    var winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winningCombos.some(function (combo) {
        var a = combo[0], b = combo[1], c = combo[2];
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}
// Disable board when the game ends
function disableBoard() {
    cells.forEach(function (cell) { return cell.disabled = true; });
}
// Reset the game
resetButton.addEventListener("click", function () {
    cells.forEach(function (cell) { cell.textContent = ""; cell.disabled = false; });
    currentPlayer = "X";
    status.textContent = "Current Player: X";
});
