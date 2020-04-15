import Vue from 'vue'
import Vuex from 'vuex'
import json from '../assets/cards.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connected: false,
    error: '',
    message: '',
    // User
    username: null,
    player: null,
    // Games
    game: null,
    gameIsFinished: false,
    messages: [],
    // Components
    cards: json

  },
  getters: {
    isHost: (state) => {
      return state.game.players[0].id == state.player.id
    },
    isGameReady: (state) => {
      return state.game.players.length > 1
    },

    isMyTurn: (state) => {
      return state.game.players[state.game.currentPlayer].id == state.player.id
    },
    amIDead: (state) => {
      return state.player.isDead
    }
  },
  mutations: {
    // Socket
    // Connection
    socketconnect (state) {
      console.log("Connected to websocket")
      state.connected = true
    },
    socketdisconnect (state) {
      console.log("Disconnected to websocket")
      state.connected = false
    },

    // User
    setName (state, username) {
      state.username = username
    },
    setPlayer (state, player) {
      state.player = player
    },

    // Game
    setGame (state, game) {
      state.game = game
      state.player = game.players.find((player) => player.id == state.player.id)
    },
    setIsFinishedGame (state, bool) {
      state.gameIsFinished = bool
    },
    resetMessages (state) {
      state.messages = []
    },
    addMessage (state, message) {
      state.messages.push(message)
    },
    playerTurn (state) {
      state.messages.push("C'est au tour de " + state.game.players[state.game.currentPlayer].username)
    }
  },
  actions: {
    // Home
    joinGame ({ commit }, game) {
      commit("resetMessage")
      commit('setPlayer', game.players[game.players.length - 1])
      commit('setGame', game)
    },
    socket_newPlayer ({ commit }, game) {
      commit('setGame', game)
    },

    // Room
    // Socket game
    socket_gameLaunched ({ commit }, game) {
      commit('resetMessages')
      commit('setGame', game)
      commit('setIsFinishedGame', false)
    },
    socket_gameEnd ({ commit }, game) {
      console.log("La partie est fini")
      commit('setGame', game)
      commit('setIsFinishedGame', true)
    },

    // Socket player
    socket_playerTurn ({ commit }, game) {
      commit('setGame', game)
      commit('playerTurn')
    },
    socket_cardSelected ({ commit }, message) {
      commit('addMessage', message)
    },
    socket_cardEffect ({ commit }, message) {
      commit('addMessage', message)
    },
  },
  modules: {
  }
})
