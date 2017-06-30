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
  $('#game-board').addClass('hidden')
  $('#-winner-modal').modal('show')
  $('#-games-button').removeClass('hidden')
}

const gameDraw = function () {
  $('#-winner-modal-title').text('Cat\'s game!')
  $('#game-board').addClass('hidden')
  $('#-winner-modal').modal('show')
  $('#-games-button').removeClass('hidden')
}

const forceSignIn = function () {
  if (!store.user) {
    $('#-signup-modal').modal('show')
  }
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
  gameDraw
}
