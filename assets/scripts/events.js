// Events file to help with attaching the events to the forms

const api = require('./api')
const getFormFields = require('../../lib/get-form-fields')
const ui = require('./ui')
const store = require('./store')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('Data: ', data)
  api.signUp(data)
    .done(ui.signUpSuccess)
    .catch(ui.signUpError)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('Data: ', data)
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
    console.log('store.user doesn\'t exist!')
  }
}

const onChangePassword = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('Data: ', data)
  if (store.user) {
    api.changePassword(data)
    .done(ui.changePasswordSuccess)
    .catch(ui.changePasswordError)
  } else {
    console.log('You have to be signed in!')
  }
}

const onCellClick = function (event) {
  console.log('Cell clicked event: ', event)
  console.log('Cell clicked event data: ', $(this).data().id)
}

const attachHandlers = () => {
  $('.signup-form').on('submit', onSignUp)
  $('.signin-form').on('submit', onSignIn)
  $('.signout-form').on('submit', onSignOut)
  $('.changepwd-form').on('submit', onChangePassword)
  $('.game-cell').on('click', onCellClick)
}

module.exports = {
  attachHandlers
}
