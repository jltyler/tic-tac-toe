const api = require('./api')

// Boolean for telling whose turn it is
let playerTwoTurn = false
let turnCount = 0

// Player colors
const playerOneColor = '#00ff00'
const playerTwoColor = '#0000ff'

// Status display
const gameStatusElement = $('.game-status')
const gameStatusHeader = gameStatusElement.children('h1')

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

const formatBoard = (board) => {
  let formatted = ''
  const size = getBoardSize(board)
  for (let i = 0; i < board.length; i++) {
    formatted += board[i] ? board[i] : '-'
    if (i % size === size - 1) {
      formatted += '\n'
    }
  }
  return formatted
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
let gameBoard = newBoard() // ['','','','','','','','','']

const maxTurns = gameBoard.length

const checkHorizontal = function (board, row) {
  console.log('checkHorizontal')
  const size = getBoardSize(board)
  const y = row * size
  const first = board[y]
  if (!first) { return false }
  for (let x = 1; x < size; x++) {
    if (board[y + x] !== first) {
      return false
    }
  }
  return first
}

const checkVertical = function (board, col) {
  console.log('checkVertical')
  const size = getBoardSize(board)
  const x = col
  const first = board[x]
  if (!first) { return false }
  for (let y = 1; y < size; y++) {
    if (board[y * size + col] !== first) {
      return false
    }
  }
  return first
}

const checkDiagonalTopLeft = function (board) {
  console.log('checkDiagonalTopLeft')
  const size = getBoardSize(board)
  const first = board[0]
  if (!first) { return false }
  for (let i = 1; i < size; i++) {
    console.log(board[i * size + i])
    if (board[i * size + i] !== first) {
      return false
    }
  }
  return first
}

const checkDiagonalTopRight = function (board) {
  console.log('checkDiagonalTopRight')
  const size = getBoardSize(board)
  const sizem = size - 1
  const first = board[sizem]
  if (!first) { return false }
  for (let i = 1; i < size; i++) {
    if (board[i * size + (sizem - i)] !== first) {
      return false
    }
  }
  return first
}

// Attempt to make a move
// Checks board
// returns true if move was successful
// returns false otherwise or if move was invalid
const attemptMove = function (board, index) {
  console.log('attemptMove(' + index + ')')
  if (board[index]) { return false }
  board[index] = getToken()
  return true
}

const newGame = function () {
  gameBoard = newBoard()
  playerTwoTurn = false
  turnCount = 0
  $('.game-cell').css('background-color', '#000')
}

const gameWon = function (playerTwo) {
  console.log('Player ', playerTwo ? 'o' : 'x', ' won!')
  gameStatusElement.css('color', playerTwo ? playerTwoColor : playerOneColor)
  gameStatusHeader.text(playerTwo ? 'Player O wins!' : 'Player X wins!')
  newGame()
}

const gameDraw = function () {
  console.log('Draw!')
  gameStatusElement.css('color', '#000')
  gameStatusHeader.text('Draw game!')
  newGame()
}

// Attempts a move and checks for a win if it was a successful move
const makeMove = function (index) {
  console.log('makeMove')
  if (attemptMove(gameBoard, index)) {
    console.log('attemptMove true')
    console.log(formatBoard(gameBoard))
    const size = getBoardSize(gameBoard)
    const row = Math.floor(index / size)
    const col = index - row * size
    turnCount++
    console.log(turnCount + ' / ' + maxTurns)
    const check = '.game-cell[data-id="' + index + '"]'
    console.log(check)
    const e = $(check)
    console.log(e)
    console.log(e.css('background-color'))
    e.css('background-color', playerTwoTurn ? playerTwoColor : playerOneColor)
    console.log(e.css('background-color'))
    if (turnCount === maxTurns) {
      gameDraw()
    } else if (checkHorizontal(gameBoard, row) ||
    checkVertical(gameBoard, col) ||
    checkDiagonalTopRight(gameBoard) ||
    checkDiagonalTopLeft(gameBoard)) {
      // Player won
      gameWon(playerTwoTurn)
    } else {
      playerTwoTurn = !playerTwoTurn
      gameStatusElement.css('color', playerTwoTurn ? playerTwoColor : playerOneColor)
      gameStatusHeader.text(playerTwoTurn ? 'Player O\'s turn' : 'Player X\'s turn')
    }
  }
}

module.exports = {
  makeMove
}
