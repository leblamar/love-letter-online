<template>
  <div>
    <v-row
      justify="center"
      class="mt-5"
    >
      <span class="display-2">
        Résultat de la partie {{ $route.params.id }}
      </span>
    </v-row>

    <br class="my-3">

    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
      >
        <div class="display-1">
          Ranking players
        </div>
        <v-list>
          <v-list-item
            v-for="(player, index) in game.players.filter(player => !player.isDead).sort((a, b) => a.card > b.card)"
            :key="index"
          >
            <v-list-item-icon>
              <v-avatar
                color="purple"
                size="40"
                tile
              >
                <span class="white--text headline">{{ player.card }}</span>
              </v-avatar>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                class="title"
                v-text="player.username"
              ></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-avatar
                color="orange"
                size="40"
              >
                <span class="white--text headline">{{ player.points }}</span>
              </v-avatar>
            </v-list-item-icon>

          </v-list-item>
        </v-list>

        <br>

        <div class="display-1">
          Fallen players
        </div>
        <v-list>
          <v-list-item
            class="my-2"
            v-for="player in game.players.filter(player => player.isDead)"
            :key="player.username"
          >
            <v-list-item-content>
              <v-list-item-title class="title">
                {{player.username}}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-avatar
                color="orange"
                size="40"
              >
                <span class="white--text headline">{{ player.points }}</span>
              </v-avatar>
            </v-list-item-icon>
          </v-list-item>
        </v-list>

        <br>
        <v-row
          v-if="isHost"
          justify="center"
        >
          <v-btn @click="launchGame()">
            Recommencer une partie
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