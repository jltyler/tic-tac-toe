// Boolean for telling whose turn it is
let playerTwoTurn = false
let turnCount = 0

// Helper for getting token
const getToken = function () {
  return playerTwoTurn ? 'o' : 'x'
}

// Helper to make new boards
const newBoard = function (size = 3) {
  const board = new Array(size * size)
  board.fill('')
  return board
}

// Get board dimensions based on total length of board array
const getBoardSize = function (board) {
  let dim = -1
  for (let i = 0; i < board.length; i++) {
    if (i * i === board.length) {
      dim = i
    } else if (i * i > board.length) {
      break
    }
  }
  return dim
}

// Game board for modifying and checking
let gameBoard = newBoard()

const maxTurns = gameBoard.length

const checkHorizontal = function (board, row) {
  const size = getBoardSize(board)
  const y = row * size
  const first = board[y]
  if (!first) { return false }
  for (let x = 1; x < size; x++) {
    if (board[y + x] !== first) {
      return false
    }
    return first
  }
}

const checkVertical = function (board, col) {
  const size = getBoardSize(board)
  const x = col
  const first = board[x]
  if (!first) { return false }
  for (let y = 1; y < size; y++) {
    if (board[y * size + col] !== first) {
      return false
    }
    return first
  }
}

const checkDiagonalTopLeft = function (board) {
  const size = getBoardSize(board)
  const first = board[0]
  if (!first) { return false }
  for (let i = 1; i < size; i++) {
    if (board[i * size + i] !== first) {
      return false
    }
    return first
  }
}

const checkDiagonalTopRight = function (board) {
  const size = getBoardSize(board)
  const sizem = size - 1
  const first = board[sizem]
  if (!first) { return false }
  for (let i = 1; i < size; i++) {
    if (board[i * size + (sizem - i)] !== first) {
      return false
    }
    return first
  }
}

// Attempt to make a move
// Checks board
// returns true if move was successful
// returns false otherwise or if move was invalid
const attemptMove = function (board, index) {
  if (board[index]) { return false }
  board[index] = getToken()
  playerTwoTurn = !playerTwoTurn
  return true
}

const newGame = function () {
  gameBoard = newBoard()
}

const gameWon = function (playerTwo) {
  console.log('Player ', playerTwo ? 'o' : 'x', ' won!')
  newGame()
}

const gameDraw = function () {
  console.log('Draw!')
  newGame()
}

// Attempts a move and checks for a win if it was a successful move
const makeMove = function (index) {
  if (attemptMove(gameBoard, index)) {
    const size = getBoardSize(gameBoard)
    const row = Math.floor(index / size)
    const col = index - row * size
    if (checkHorizontal(gameBoard, row) ||
    checkVertical(gameBoard, col) ||
    checkDiagonalTopRight(gameBoard) ||
    checkDiagonalTopLeft(gameBoard)) {
      // Player won
      gameWon(playerTwoTurn)
    } else if (turnCount === maxTurns) {
      gameDraw()
    }
  }
}

module.exports = {
  makeMove
}
