const store = require('./store')
// const api = require('./api')
// const game = require('./game')

const signUpSuccess = (response) => {
  // console.log('signUp Success: ', response)
  // $('#-signup-modal').modal('hide')
}

const signUpError = (response) => {
  // console.log('signUp Failure: ', response)
}

const signInSuccess = (response) => {
  // console.log('signIn Success: ', response)
  store.user = response.user
  // console.log('Store: ', store)
  $('#-signup-modal').modal('hide')
  $('#-signup-button').toggleClass('hidden')
  $('#-logout-button').toggleClass('hidden')
  $('#-changepwd-button').toggleClass('hidden')
  $('#-games-navbar-button').toggleClass('hidden')
}

const signInError = (response) => {
  // console.log('signIn Failure: ', response)
}

const signOutSuccess = (response) => {
  // console.log('signOut Success: ', response)
  store.user = undefined
  $('#-signup-button').toggleClass('hidden')
  $('#-logout-button').toggleClass('hidden')
  $('#-changepwd-button').toggleClass('hidden')
  $('#-games-navbar-button').toggleClass('hidden')
  $('#game-board').addClass('hidden')
  forceSignIn()
}

const signOutError = (response) => {
  // console.log('signOut Failure: ', response)
}

const changePasswordSuccess = (response) => {
  // console.log('changePassword Success: ', response)
  $('#-changepwd-modal').modal('hide')
}

const changePasswordError = (response) => {
  // console.log('changePassword Failure: ', response)
}

const forceNewGame = function () {
  if (!store.currentGame) {
    $('#-games-modal').modal('show')
  }
}

const gameWon = function (playerTwo) {
  $('#-winner-modal-title').text(playerTwo ? 'Player O wins!' : 'Player X wins!')
  $('#game-board').addClass('hidden')
  // $('#-games-modal').modal('show')
  $('#-winner-modal').modal('show')
}

const gameDraw = function () {
  $('#-winner-modal-title').text('Cat\'s game!')
  // $('#-games-modal').modal('show')
  $('#game-board').addClass('hidden')
  $('#-winner-modal').modal('show')
}

const forceSignIn = function () {
  if (!store.user) {
    $('#-signup-modal').modal('show')
  }
}

const populateGamesList = function (gamesData) {
  const elements = []
  const gameslist = $('#-games-list')
  gameslist.html('')
  if (gamesData.length > 0) {
    for (let i = 0; i < gamesData.length; i++) {
      const currGame = gamesData[i]
      const newElement = $(document.createElement('li'))
      newElement.addClass('list-group-item')
      newElement.text('Select game (' + currGame.id + ')')
      newElement.attr('data-gameid', currGame.id)
      elements.append(newElement)
      gameslist.append(newElement)
    }
  }
  return elements
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
  populateGamesList
}
