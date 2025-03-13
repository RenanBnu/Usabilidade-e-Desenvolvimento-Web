const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusText.innerText = `Jogador ${board[a]} venceu!`;
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        statusText.innerText = "Empate!";
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameActive) {
        statusText.innerText = `Vez do jogador ${currentPlayer}`;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.innerText = "Vez do jogador X";
    cells.forEach(cell => cell.innerText = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);