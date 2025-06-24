const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const twoPlayerBtn = document.getElementById("twoPlayerBtn");
const aiBtn = document.getElementById("aiBtn");

let cells, currentPlayer, gameActive, vsAI;

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
  cells = document.querySelectorAll(".cell");
}

function handleClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (cell.textContent !== "" || !gameActive) return;

  cell.textContent = currentPlayer;
  cell.classList.add("disabled");

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if (vsAI && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

function aiMove() {
  let availableCells = [...cells].filter((cell) => cell.textContent === "");
  if (availableCells.length === 0 || !gameActive) return;

  const randomCell =
    availableCells[Math.floor(Math.random() * availableCells.length)];
  randomCell.click();
}

function checkWin() {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winCombos.some((combo) => {
    const [a, b, c] = combo;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    );
  });
}

function isDraw() {
  return [...cells].every((cell) => cell.textContent !== "");
}

function startGame(modeAI = false) {
  createBoard();
  currentPlayer = "X";
  gameActive = true;
  vsAI = modeAI;
  statusText.textContent = "Player X's turn";
}

restartBtn.addEventListener("click", () => startGame(vsAI));
twoPlayerBtn.addEventListener("click", () => startGame(false));
aiBtn.addEventListener("click", () => startGame(true));

startGame();
