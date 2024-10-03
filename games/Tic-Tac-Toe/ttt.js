const board = document.getElementById("board");
const status = document.getElementById("status");
const resultModal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const restartBtn = document.getElementById("restartBtn");
const starsContainer = document.getElementById("stars");

let currentPlayer = "X";
const cells = new Array(9).fill(null);

// Function to generate random stars
function generateStars() {
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = `${Math.floor(Math.random() * 5) + 3}px`; // Random width (3-7px)
    star.style.height = star.style.width;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    starsContainer.appendChild(star);
  }
}

generateStars(); // Call the function to generate stars

function handleCellClick(cell, index) {
  if (cells[index] || checkWinner()) return;
  cell.textContent = currentPlayer;
  cells[index] = currentPlayer;

  if (checkWinner()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    drawWinningLine();
    setTimeout(() => openResultModal(`Player ${currentPlayer} wins!`), 1000);
  } else if (cells.every((cell) => cell !== null)) {
    status.textContent = "It's a draw!";
    setTimeout(() => openResultModal("It's a draw!"), 2000);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winCombinations) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return currentPlayer;
    }
  }

  return null;
}

function drawWinningLine() {
  // Add your logic to draw a line
}

function openResultModal(result) {
  resultText.textContent = result;
  resultModal.style.display = "flex";
}

function restartGame() {
  cells.fill(null);
  currentPlayer = "X";
  status.textContent = "Player X's turn";
  resultModal.style.display = "none";

  // Clear the board
  const cellElements = document.querySelectorAll(".cell");
  cellElements.forEach((cell) => (cell.textContent = ""));

  // Remove the winning line (if drawn)
  // You need to implement a logic for removing the winning line
}

restartBtn.addEventListener("click", restartGame);

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.addEventListener("click", () => handleCellClick(cell, i));
  board.appendChild(cell);
}
