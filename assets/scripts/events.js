// Events file to help with attaching the events to the forms

const api = require('./api')
const getFormFields = require('../../lib/get-form-fields')
const ui = require('./ui')
const store = require('./store')
const game = require('./game')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('Data: ', data)
  api.signUp(data)
    // .done(ui.signUpSuccess)
    .done(function (response) {
      // console.log('signUp success; auto-signIn')
      const sdata = {
        credentials: {
          email: data.credentials.email,
          password: data.credentials.password
        }
      }
      // console.log('sdata: ', sdata)
      api.signIn(sdata)
        .done(ui.signInSuccess)
        .catch(ui.signInError)
    })
    .catch(ui.signUpError)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('Data: ', data)
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
    // console.log('store.user doesn\'t exist!')
  }
}

const onChangePassword = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('Data: ', data)
  if (store.user) {
    api.changePassword(data)
    .done(ui.changePasswordSuccess)
    .catch(ui.changePasswordError)
  } else {
    // console.log('You have to be signed in!')
  }
}

const onNewGame = function (event) {
  event.preventDefault()
  if (store.user) {
    api.createGame()
    .done(game.openGame)
    .catch(function () {
      // console.log('onNewGame error!')
    })
  } else {
    // console.log('You have to be signed in!')
  }
}

const onGetGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (store.user) {
    api.getGameID(data.game.id)
    .done(game.openGame)
    .catch(function () {
      // console.log('onGetGame error!')
    })
  } else {
    // console.log('You have to be signed in!')
  }
}

const onGetAllGames = function (event) {
  event.preventDefault()
  if (store.user) {
    api.getGames()
    .done(game.retrieveGames)
    .catch(function () {
      // console.log('onGetAllGames error!')
    })
  } else {
    // console.log('You have to be signed in!')
  }
}

const onCellClick = function (event) {
  const cell = $(this).data().id
  game.makeMove(cell)
  // console.log('Cell clicked: ', cell)
}

const attachHandlers = () => {
  // Auth API events
  $('.signup-form').on('submit', onSignUp)
  $('#-signup-modal-form').on('submit', onSignUp)
  $('.signin-form').on('submit', onSignIn)
  $('#-signin-modal-form').on('submit', onSignIn)
  $('.signout-form').on('submit', onSignOut)
  $('#-logout-button').on('click', onSignOut)
  $('.changepwd-form').on('submit', onChangePassword)
  $('#-changepwd-modal-form').on('submit', onChangePassword)
  // Game API events
  $('.newgame-form').on('submit', onNewGame)
  $('#-games-modal-newgame').on('click', onNewGame)
  $('.getgame-form').on('submit', onGetGame)
  $('.getallgames-form').on('submit', onGetAllGames)
  $('#-games-navbar-button').on('click', function (event) {
    onGetAllGames(event)
    $('#-games-modal').modal('show')
  })

  // Cell clicked event
  $('.game-cell').on('click', onCellClick)

  // Force actions events
  // $('#-signup-modal').on('hidden.bs.modal', ui.forceSignIn)
  // $('#-games-modal').on('hidden.bs.modal', ui.forceNewGame)
  ui.forceSignIn()
}

module.exports = {
  attachHandlers
}
