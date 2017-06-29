const api = require('./api')
const store = require('./store')
const ui = require('./ui')

// Boolean for telling whose turn it is
let playerTwoTurn = false
let turnCount = 0

// Player colors
const playerOneColor = '#00ff00'
const playerTwoColor = '#0000ff'

// Status display
const gameStatusElement = $('.game-status')
const gameStatusHeader = gameStatusElement.children('h1')

// API success handlers
const retrieveGames = function (response) {
  // console.log('retrieveGames(', response, ')')
  const games = response.games
  const stats = evaluateGames(response)
  $('#-games-modal-games-title').text('No unfinished games!')
  $('#-games-modal-stats').text('Stats: (W: ' + stats.win + ', L: ' + stats.loss + ', D: ' + stats.draw + ', Unfinished: ' + stats.unfinished + ', Total: ' + games.length + ')')
  const unfinished = games.filter(game => !game.over)
  const gameslist = $('#-games-list')
  gameslist.html('')
  if (unfinished.length) {
    // console.log('Unfinished games found')
    $('#-games-modal-games-title').text(unfinished.length + ' unfinished games found!')
    for (let i = 0; i < unfinished.length; i++) {
      const currGame = unfinished[i]
      if (store.finished.includes(currGame.id)) {
        continue
      }
      // console.log('Unfinished game: ', currGame)
      const newElement = $(document.createElement('a'))
      newElement.addClass('list-group-item')
      newElement.attr('href', '#')
      newElement.text('Select game (' + currGame.id + ')')
      newElement.attr('data-gameid', currGame.id)
      newElement.on('click', function (event) {
        // console.log('CLICK EVENT', event.target)
        openGame({game: currGame})
        // console.log('gameClicked hide!')
        $('#-games-modal').modal('hide')
      })
      gameslist.append(newElement)
    }
  }
}

const openGame = function (response) {
  if (!response.game || response.game.over) { return false }
  // console.log('Opening game ID: ', response.game.id)
  store.currentGame = response.game
  // console.log('store.currentGame: ', store.currentGame)
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
    // console.log('=== Evaluating game ' + i + ' (' + response.games[i].id + ')===')
    // console.log(formatBoard(response.games[i].cells))
    if (!response.games[i].over) {
      // console.log('Game is unfinished!')
      record.unfinished++
    } else if (evaluateGame(response.games[i], false)) {
      // console.log('Player X wins!')
      record.win++
    } else if (evaluateGame(response.games[i], true)) {
      // console.log('Player O wins!')
      record.loss++
    } else {
      // console.log('Game was a draw!')
      record.draw++
    }
  }
  // console.log(record)
  return record
}

const retrieveGameID = function (response) {
  // console.log('retrieveGameID(', response, ')')
  return response.game
}

const mapGame = function (gameData) {
  // console.log('mapGame(', gameData, ')')
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
  // console.log('mapGame hide!')
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
      // console.log('updateGameSuccess ', response)
    })
  } else {
    // console.log('store.currentGame is not a game?')
    // console.log(store)
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

// Helper to format the board for console output
const formatBoard = (board) => {
  let formatted = ''
  const size = getBoardSize(board)
  for (let i = 0; i < board.length; i++) {
    formatted += board[i] ? board[i] : '-'
    if ((i % size === size - 1) /* && (i !== board.length - 1) */) {
      formatted += '\n'
    }
  }
  return formatted
}

// Helper to change the (visual) cells easier
const changeCell = function (board, index, playerTwo) {
  // console.log('changeCell(', board, ', ', index, ', ', playerTwo, ')')
  board[index] = getToken(playerTwo)
  // console.log('board[index] === ', board[index])
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
  // console.log('checkHorizontal')
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
  // console.log('checkVertical')
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
  // console.log('checkDiagonalTopLeft')
  const size = getBoardSize(board)
  const token = getToken(playerTwo)
  if (!token) { return false }
  for (let i = 0; i < size; i++) {
    // console.log(board[i * size + i])
    if (board[i * size + i] !== token) {
      return false
    }
  }
  return token
}

const checkDiagonalTopRight = function (board, playerTwo) {
  // console.log('checkDiagonalTopRight')
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
  // console.log('attemptMove(' + index + ')')
  if (board[index]) { return false }
  changeCell(board, index, playerTwo)
  return true
}

const newGame = function () {
  gameBoard = newBoard()
  playerTwoTurn = false
  turnCount = 0
  $('.game-cell').css('background-color', '#000')
  return gameBoard
}

const gameWon = function (playerTwo) {
  // console.log('Player ', playerTwo ? 'o' : 'x', ' won!')
  // gameStatusElement.css('color', playerTwo ? playerTwoColor : playerOneColor)
  // gameStatusHeader.text(playerTwo ? 'Player O wins!' : 'Player X wins!')
  store.finished.push(store.currentGame.id)
  store.currentGame = false
  ui.gameWon(playerTwo)
  api.getGames()
  .done(retrieveGames)
  .catch(function () {
    // console.log('onGetAllGames error!')
  })
  newGame()
}

const gameDraw = function () {
  // console.log('Draw!')
  // gameStatusElement.css('color', '#000')
  // gameStatusHeader.text('Draw game!')
  store.finished.push(store.currentGame.id)
  store.currentGame = false
  ui.gameDraw()
  api.getGames()
  .done(retrieveGames)
  .catch(function () {
    // console.log('onGetAllGames error!')
  })
  newGame()
}

// MAIN GAME LOGIC
// Attempts a move and checks for a win if it was a successful move
const makeMove = function (index) {
  // console.log('makeMove')
  if (attemptMove(gameBoard, index, playerTwoTurn)) {
    // console.log('attemptMove true')
    // console.log(formatBoard(gameBoard))
    const size = getBoardSize(gameBoard)
    const row = Math.floor(index / size)
    const col = index - row * size
    turnCount++
    // console.log('Turn: ' + turnCount + ' / ' + maxTurns)
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
      // gameStatusElement.css('color', playerTwoTurn ? playerTwoColor : playerOneColor)
      // gameStatusHeader.text(playerTwoTurn ? 'Player O\'s turn' : 'Player X\'s turn')
    }
  }
}

module.exports = {
  makeMove,
  retrieveGames,
  openGame
}
