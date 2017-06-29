const api = require('./api')
const store = require('./store')
const ui = require('./ui')

// Boolean for telling whose turn it is
let playerTwoTurn = false
let turnCount = 0

// Player colors
const playerOneColor = '#ff8800'
const playerTwoColor = '#0044ff'
const emptyColor = '#e5e5e5'

// Status display
const gameStatusElement = $('.game-status')
const gameStatusHeader = gameStatusElement.children('h1')

// API success handlers
const retrieveGames = function (response) {
  const games = response.games
  const stats = evaluateGames(response)
  $('#-games-modal-games-title').text('No unfinished games!')
  $('#-games-modal-stats').text('Stats: (Wins: ' + stats.win + ', Losses: ' + stats.loss + ', Draws: ' + stats.draw + ', Unfinished: ' + stats.unfinished + ', Total: ' + games.length + ')')
  const unfinished = games.filter(game => !game.over)
  const gameslist = $('#-games-list')
  gameslist.html('')
  if (unfinished.length) {
    $('#-games-modal-games-title').text(unfinished.length + ' unfinished games found!')
    for (let i = 0; i < unfinished.length; i++) {
      const currGame = unfinished[i]
      if (store.finished.includes(currGame.id)) {
        continue
      }
      const newElement = $(document.createElement('a'))
      newElement.addClass('list-group-item')
      newElement.attr('href', '#')
      newElement.text('Select game (' + currGame.id + ')')
      newElement.attr('data-gameid', currGame.id)
      newElement.on('click', function (event) {
        openGame({game: currGame})
        $('#-games-modal').modal('hide')
      })
      gameslist.append(newElement)
    }
  }
}

const openGame = function (response) {
  if (!response.game || response.game.over) { return false }
  store.currentGame = response.game
  return mapGame(response.game)
}

const evaluateGame = function (gameData, playerTwo) {
  const cells = gameData.cells
  if (checkHorizontal(cells, 0, playerTwo) ||
  checkVertical(cells, 0, playerTwo) ||
  checkHorizontal(cells, 1, playerTwo) ||
  checkVertical(cells, 1, playerTwo) ||
  checkHorizontal(cells, 2, playerTwo) ||
  checkVertical(cells, 2, playerTwo) ||
  checkDiagonalTopRight(cells, playerTwo) ||
  checkDiagonalTopLeft(cells, playerTwo)) {
    return true
  } else {
    return false
  }
}

const evaluateGames = function (response) {
  const record = {
    win: 0,
    loss: 0,
    draw: 0,
    unfinished: 0
  }
  if (response.games.length === 0) {
    return record
  }
  for (let i = 0; i < response.games.length; i++) {
    if (!response.games[i].over) {
      record.unfinished++
    } else if (evaluateGame(response.games[i], false)) {
      record.win++
    } else if (evaluateGame(response.games[i], true)) {
      record.loss++
    } else {
      record.draw++
    }
  }
  return record
}

const mapGame = function (gameData) {
  if (gameData.over) { return false }
  const board = newGame()
  for (let i = 0; i < gameData.cells.length; i++) {
    const token = gameData.cells[i]
    if (token) {
      changeCell(board, i, token === 'o')
      playerTwoTurn = !playerTwoTurn
      turnCount++
    }
  }
  displayTurn(playerTwoTurn)
  $('#-games-modal').modal('hide')
  $('#game-board').removeClass('hidden')
  return true
}

const sendMove = function (board, index, playerTwo, over = false) {
  if (store.currentGame) {
    const data = {
      game: {
        cell: {
          index,
          value: getToken(playerTwo)
        },
        over
      }
    }
    api.updateGame(store.currentGame.id, data)
    .done(function (response) {
    })
  } else {
  }
}
// HELPERS
// Helper for getting token
const getToken = function (playerTwo) {
  return playerTwo ? 'o' : 'x'
}

// Helper to change game status display
const displayTurn = function (playerTwo) {
  gameStatusElement.css('color', playerTwo ? playerTwoColor : playerOneColor)
  gameStatusHeader.text(playerTwo ? 'Player O\'s turn' : 'Player X\'s turn')
}

// Helper to make new boards
const newBoard = function (size = 3) {
  const board = new Array(size * size)
  board.fill('')
  return board
}

// Helper to change the (visual) cells easier
const changeCell = function (board, index, playerTwo) {
  board[index] = getToken(playerTwo)
  const cell = $('.game-cell[data-id="' + index + '"]')
  cell.css('background-color', playerTwo ? playerTwoColor : playerOneColor)
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

const checkHorizontal = function (board, row, playerTwo) {
  const size = getBoardSize(board)
  const y = row * size
  const token = getToken(playerTwo)
  if (!token) { return false }
  for (let x = 0; x < size; x++) {
    if (board[y + x] !== token) {
      return false
    }
  }
  return token
}

const checkVertical = function (board, col, playerTwo) {
  const size = getBoardSize(board)
  const token = getToken(playerTwo)
  if (!token) { return false }
  for (let y = 0; y < size; y++) {
    if (board[y * size + col] !== token) {
      return false
    }
  }
  return token
}

const checkDiagonalTopLeft = function (board, playerTwo) {
  const size = getBoardSize(board)
  const token = getToken(playerTwo)
  if (!token) { return false }
  for (let i = 0; i < size; i++) {
    if (board[i * size + i] !== token) {
      return false
    }
  }
  return token
}

const checkDiagonalTopRight = function (board, playerTwo) {
  const size = getBoardSize(board)
  const sizem = size - 1
  const token = getToken(playerTwo)
  if (!token) { return false }
  for (let i = 0; i < size; i++) {
    if (board[i * size + (sizem - i)] !== token) {
      return false
    }
  }
  return token
}

// Attempt to make a move
// Checks board
// returns true if move was successful
// returns false otherwise or if move was invalid
const attemptMove = function (board, index, playerTwo) {
  if (board[index]) { return false }
  changeCell(board, index, playerTwo)
  return true
}

const newGame = function () {
  gameBoard = newBoard()
  playerTwoTurn = false
  turnCount = 0
  $('.game-cell').css('background-color', emptyColor)
  return gameBoard
}

const gameWon = function (playerTwo) {
  store.finished.push(store.currentGame.id)
  store.currentGame = false
  ui.gameWon(playerTwo)
  api.getGames()
  .done(retrieveGames)
  .catch(function () {
  })
  newGame()
}

const gameDraw = function () {
  store.finished.push(store.currentGame.id)
  store.currentGame = false
  ui.gameDraw()
  api.getGames()
  .done(retrieveGames)
  .catch(function () {
  })
  newGame()
}

// MAIN GAME LOGIC
// Attempts a move and checks for a win if it was a successful move
const makeMove = function (index) {
  if (attemptMove(gameBoard, index, playerTwoTurn)) {
    const size = getBoardSize(gameBoard)
    const row = Math.floor(index / size)
    const col = index - row * size
    turnCount++
    if (checkHorizontal(gameBoard, row, playerTwoTurn) ||
    checkVertical(gameBoard, col, playerTwoTurn) ||
    checkDiagonalTopRight(gameBoard, playerTwoTurn) ||
    checkDiagonalTopLeft(gameBoard, playerTwoTurn)) {
      // Player won
      sendMove(gameBoard, index, playerTwoTurn, true)
      gameWon(playerTwoTurn)
    } else if (turnCount === maxTurns) {
      sendMove(gameBoard, index, playerTwoTurn, true)
      gameDraw()
    } else {
      sendMove(gameBoard, index, playerTwoTurn)
      playerTwoTurn = !playerTwoTurn
      displayTurn(playerTwoTurn)
    }
  }
}

module.exports = {
  makeMove,
  retrieveGames,
  openGame
}
