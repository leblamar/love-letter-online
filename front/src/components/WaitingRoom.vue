<template>
  <div>
    <v-row
      justify="center"
      class="mt-5"
    >
      <span class="display-4">
        {{ $route.params.id }}
      </span>
    </v-row>

    <br class="my-3">

    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
      >
        <div class="display-1">
          Waiting players
        </div>
        <v-list>
          <v-list-item
            v-for="player in game.players"
            :key="player.username"
          >
            <v-list-item-content>
              <v-list-item-title
                class="title"
                v-text="player.username"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <br>
        <v-row
          justify="center"
          v-if="isHost"
        >
          <v-btn @click="launchGame()">
            Lancer la partie
          </v-btn>
        </v-row>
      </v-col>
    </v-row>

  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      game: 'game'
    }),
    ...mapGetters([
      'isHost',
      'isGameReady'
    ]),
  },
  methods: {
    launchGame () {
      console.log("launching game")
      this.$socket.emit('launchGame', this.$store.state.game.id)
    }
  },
}
</script>