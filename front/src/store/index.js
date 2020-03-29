import Vue from 'vue'
import Vuex from 'vuex'

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
    messages: [],
    games: [],
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
    SOCKET_connect (state) {
      console.log("Connected to websocket")
      state.connected = true
    },
    SOCKET_disconnect (state) {
      state.connected = false
    },
    SOCKET_ping () {
      console.log('ping')
    },
    // User
    setName (state, username) {
      state.username = username
      // console.log(username)
    },
    setPlayer (state, player) {
      state.player = player
    },
    // Game
    setGame (state, game) {
      state.game = game
      state.player = game.players.find((player) => player.id == state.player.id)
      // console.log(game)
    },
    resetMessage (state) {
      state.messages = []
    },
    addMessage (state, message) {
      state.messages.push(message)
    },
    playerTurn (state) {
      state.messages.push("C'est au tour de " + state.game.players[state.game.currentPlayer].username)
    }
    // Socket
    // SOCKET_NEW_GAME (state, game) {
    //   state.game = game
    //   // this.$router.push({ name: 'game', params: { id: state.game.id } })
    // },
    // SOCKET_PLAYER_JOIN (state, game) {
    //   state.game = game
    // }
  },
  actions: {

  },
  modules: {
  }
})
