<template>
  <div>
    <div v-if="!game.hasStarted">
      <WaitingRoom />
    </div>
    <div v-else>
      <div v-if="!hasFinished">
        <PlayingRoom />
      </div>
      <div v-else>
        coucou
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import WaitingRoom from "@/components/WaitingRoom"
import PlayingRoom from "@/components/PlayingRoom"

export default {
  components: {
    WaitingRoom,
    PlayingRoom
  },
  computed: {
    ...mapState({
      game: 'game'
    }),
  },
  data () {
    return {
      hasFinished: false
    }
  },
  sockets: {
    newPlayer: function (game) {
      this.$store.commit('setGame', game)
    },
    launchGame: function (game) {
      this.$store.commit('setGame', game)
    },
    playerTurn: function (game) {
      this.$store.commit('setGame', game)
      this.$store.commit('playerTurn')
    },
    cardSelected: function (message) {
      this.$store.commit('addMessage', message)
    },
    cardEffect: function (message) {
      this.$store.commit('addMessage', message)
    },
    gameEnd: function (game) {
      this.$store.commit('setGame', game)
      this.hasFinished = true
    },

  },
}
</script>