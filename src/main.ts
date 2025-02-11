const cells = document.querySelectorAll<HTMLButtonElement>(".cell");
const statusText = document.getElementById("status") as HTMLElement;
const resetButton = document.getElementById("reset") as HTMLButtonElement;

let currentPlayer = "X";

// Initialize the game
statusText.textContent = "Current Player: X"; // Set initial status

cells.forEach(cell => {
    cell.addEventListener("click", function () {
        // Only allow marking the cell if it's empty
        if (this.textContent === "") {
            this.textContent = currentPlayer; // Mark the cell with the current player's symbol

            // Check for a winner after each move
            if (checkWinner()) {
                statusText.textContent = `${currentPlayer} Wins!`;
                disableBoard();
            } else if ([...cells].every(c => c.textContent !== "")) {
                // If all cells are filled and no winner, it's a draw
                statusText.textContent = "It's a Draw!";
            } else {
                // If there's no winner and the board isn't full, change the current player
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusText.textContent = `Current Player: ${currentPlayer}`;
            }
        }
    });
});

// Function to check if any player has won
function checkWinner(): boolean {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent;
    });
}

// Disable all cells (when there's a winner)
function disableBoard() {
    cells.forEach(cell => cell.disabled = true);
}

// Reset the game state
resetButton.addEventListener("click", () => {
    cells.forEach(cell => {
        cell.textContent = ""; // Clear the cell content
        cell.disabled = false; // Enable the cell again
    });
    currentPlayer = "X"; // Reset the current player to X
    statusText.textContent = "Current Player: X"; // Reset status text
});
