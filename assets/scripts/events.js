// Events file to help with attaching the events to the forms

const api = require('./api')
const getFormFields = require('../../lib/get-form-fields')
const ui = require('./ui')
const store = require('./store')
const game = require('./game')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .done(function (response) {
      const sdata = {
        credentials: {
          email: data.credentials.email,
          password: data.credentials.password
        }
      }
      api.signIn(sdata)
        .done(ui.signInSuccess)
        .catch(ui.signInError)
    })
    .catch(ui.signUpError)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .done(ui.signInSuccess)
    .catch(ui.signInError)
}

const onSignOut = (event) => {
  event.preventDefault()
  if (store.user) {
    api.signOut()
    .done(ui.signOutSuccess)
    .catch(ui.signOutError)
  } else {
  }
}

const onChangePassword = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (store.user) {
    api.changePassword(data)
    .done(ui.changePasswordSuccess)
    .catch(ui.changePasswordError)
  } else {
  }
}

const onNewGame = function (event) {
  event.preventDefault()
  if (store.user) {
    api.createGame()
    .done(game.openGame)
    .catch(function () {
    })
  } else {
  }
}

const onGetAllGames = function (event) {
  event.preventDefault()
  if (store.user) {
    api.getGames()
    .done(game.retrieveGames)
    .catch(function () {
    })
  } else {
  }
}

const onCellClick = function (event) {
  const cell = $(this).data().id
  game.makeMove(cell)
}

const attachHandlers = () => {
  // Auth API events
  $('#-signup-modal-form').on('submit', onSignUp)
  $('#-signin-modal-form').on('submit', onSignIn)
  $('#-logout-button').on('click', onSignOut)
  $('#-changepwd-modal-form').on('submit', onChangePassword)

  // Game API events
  $('#-games-modal-newgame').on('click', onNewGame)
  $('#-games-navbar-button, #-games-button').on('click', function (event) {
    onGetAllGames(event)
    $('#-games-modal').modal('show')
  })

  // Cell clicked event
  $('.game-cell').on('click', onCellClick)

  // Force actions events
  ui.forceSignIn()
}

module.exports = {
  attachHandlers
}
