const store = require('./store')

const signUpSuccess = (response) => {
}

const signUpError = (response) => {
}

const signInSuccess = (response) => {
  store.user = response.user
  $('#-signup-modal').modal('hide')
  $('#-signup-button').addClass('hidden')
  $('#-logout-button').removeClass('hidden')
  $('#-changepwd-button').removeClass('hidden')
  $('#-games-navbar-button').removeClass('hidden')
  $('#-games-button').removeClass('hidden')
}

const signInError = (response) => {
}

const signOutSuccess = (response) => {
  store.user = undefined
  store.currentGame = false
  $('#-signup-button').removeClass('hidden')
  $('#-logout-button').addClass('hidden')
  $('#-changepwd-button').addClass('hidden')
  $('#-games-navbar-button').addClass('hidden')
  $('#game-board').addClass('hidden')
  $('#-games-button').addClass('hidden')
  forceSignIn()
}

const signOutError = (response) => {
}

const changePasswordSuccess = (response) => {
  $('#-changepwd-modal').modal('hide')
}

const changePasswordError = (response) => {
}

const forceNewGame = function () {
  if (!store.currentGame) {
    $('#-games-modal').modal('show')
  }
}

const gameWon = function (playerTwo) {
  $('#-winner-modal-title').text(playerTwo ? 'Player O wins!' : 'Player X wins!')
  hideGameBoard()
  $('#-winner-modal').modal('show')
}

const gameDraw = function () {
  $('#-winner-modal-title').text('Cat\'s game!')
  hideGameBoard()
  $('#-winner-modal').modal('show')
}

const forceSignIn = function () {
  if (!store.user) {
    $('#-signup-modal').modal('show')
  }
}

const showGameBoard = function () {
  $('#game-board').removeClass('hidden')
  $('#-games-button').addClass('hidden')
}

const hideGameBoard = function () {
  $('#game-board').addClass('hidden')
  $('#-games-button').removeClass('hidden')
}

const resetGamesModal = function (stats) {
  $('#-games-modal-games-title').text('No unfinished games!')
  $('#-games-modal-stats').text('Stats: (Wins: ' + stats.win + ', Losses: ' + stats.loss + ', Draws: ' + stats.draw + ', Unfinished: ' + stats.unfinished + ', Total: ' + stats.total + ')')
}

module.exports = {
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  signOutSuccess,
  signOutError,
  changePasswordSuccess,
  changePasswordError,
  forceSignIn,
  forceNewGame,
  gameWon,
  gameDraw,
  showGameBoard,
  hideGameBoard,
  resetGamesModal
}
