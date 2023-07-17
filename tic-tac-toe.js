// JavaScript code for Tic Tac Toe game logic

// Constants for representing players
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Initialize game variables
let currentPlayer = PLAYER_X;
let gameOver = false;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Function to handle a player's move
function handleMove(index) {
  if (gameOver || gameBoard[index] !== '') return;

  gameBoard[index] = currentPlayer;
  document.getElementsByClassName('cell')[index].textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    gameOver = true;
    alert(`${currentPlayer} wins!`);
    resetGame();
  } else if (checkDraw()) {
    gameOver = true;
    alert("It's a draw!");
    resetGame();
  } else {
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    if (currentPlayer === PLAYER_O) {
      setTimeout(makeAIMove, 500); // Delay AI move for better visualization
    }
  }
}

// Function to check if a player has won
function checkWin(player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern => pattern.every(index => gameBoard[index] === player));
}

// Function to check if the game is a draw
function checkDraw() {
  return gameBoard.every(cell => cell !== '');
}

// Function to reset the game state
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = PLAYER_X;
  gameOver = false;

  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
}

// Function to make the AI move
function makeAIMove() {
  if (gameOver) return;

  let availableMoves = [];
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === '') {
      availableMoves.push(i);
    }
  }

  if (availableMoves.length === 0) return; // No available moves left

  // Check for winning moves and blocking moves
  const winningMove = getWinningMove(PLAYER_O);
  const blockingMove = getWinningMove(PLAYER_X);

  const selectedMove = winningMove !== -1 ? winningMove : blockingMove !== -1 ? blockingMove : availableMoves[0];
  handleMove(selectedMove);
}

// Function to find a winning move for a player
function getWinningMove(player) {
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === '') {
      gameBoard[i] = player;
      if (checkWin(player)) {
        gameBoard[i] = ''; // Reset the test move
        return i; // Return the winning move index
      }
      gameBoard[i] = ''; // Reset the test move
    }
  }
  return -1; // No winning move found
}
