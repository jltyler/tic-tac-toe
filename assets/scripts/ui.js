const store = require('./store')

const signUpSuccess = (response) => {
  console.log('signUp Success: ', response)
}

const signUpError = (response) => {
  console.log('signUp Failure: ', response)
}

const signInSuccess = (response) => {
  console.log('signIn Success: ', response)
  store.user = response.user
  console.log('Store: ', store)
}

const signInError = (response) => {
  console.log('signIn Failure: ', response)
}

const signOutSuccess = (response) => {
  console.log('signOut Success: ', response)
}

const signOutError = (response) => {
  console.log('signOut Failure: ', response)
}

const changePasswordSuccess = (response) => {
  console.log('changePassword Success: ', response)
}

const changePasswordError = (response) => {
  console.log('changePassword Failure: ', response)
}

module.exports = {
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  signOutSuccess,
  signOutError,
  changePasswordSuccess,
  changePasswordError
}
