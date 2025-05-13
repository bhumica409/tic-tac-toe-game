const board = document.getElementById('board');
const statusText = document.getElementById('status');
let cells = [];
let boardState = Array(9).fill(null);
let isGameOver = false;

function createBoard() {
  board.innerHTML = '';
  boardState = Array(9).fill(null);
  isGameOver = false;
  statusText.textContent = "Your turn (X)";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('button');
    cell.classList.add('cell');
    cell.addEventListener('click', () => makeMove(i));
    board.appendChild(cell);
    cells[i] = cell;
  }
}

function makeMove(index) {
  if (isGameOver || boardState[index]) return;
  boardState[index] = 'X';
  cells[index].textContent = 'X';
  if (checkWinner('X')) {
    statusText.textContent = "You win!";
    isGameOver = true;
    return;
  }
  if (boardState.every(cell => cell)) {
    statusText.textContent = "Draw!";
    return;
  }

  // Computer move
  statusText.textContent = "Computer's turn...";
  setTimeout(() => {
    computerMove();
  }, 500);
}

function computerMove() {
  let emptyIndices = boardState
    .map((val, i) => (val === null ? i : null))
    .filter(i => i !== null);

  if (emptyIndices.length === 0 || isGameOver) return;

  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  boardState[randomIndex] = 'O';
  cells[randomIndex].textContent = 'O';

  if (checkWinner('O')) {
    statusText.textContent = "Computer wins!";
    isGameOver = true;
    return;
  }

  if (boardState.every(cell => cell)) {
    statusText.textContent = "Draw!";
  } else {
    statusText.textContent = "Your turn (X)";
  }
}

function checkWinner(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(i => boardState[i] === player)
  );
}

function resetGame() {
  createBoard();
}

createBoard();
