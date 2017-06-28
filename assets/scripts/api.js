// Holds functions to help with the AJAX calls to the back-end

const config = require('./config')
const store = require('./store')

const signUp = (data) => {
  return $.ajax({
    url: config.url + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = (data) => {
  return $.ajax({
    url: config.url + '/sign-in',
    method: 'POST',
    data
  })
}

const signOut = () => {
  return $.ajax({
    url: config.url + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const changePassword = (data) => {
  return $.ajax({
    url: config.url + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

const getGames = () => {
  return $.ajax({
    url: config.url + '/games',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const getGameID = (id) => {
  return $.ajax({
    url: config.url + '/games/' + id,
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const createGame = () => {
  return $.ajax({
    url: config.url + '/games',
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const updateGame = (id, data) => {
  return $.ajax({
    url: config.url + '/games/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  getGames,
  getGameID,
  createGame,
  updateGame
}
