<template>
  <div class="home">
    <!-- <img
      alt="Vue logo"
      src="../assets/logo.png"
    > -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>
      <h1 class="text-center">Love letter online</h1>
    </div>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
        md="8"
        align="center"
      >
        <div>
          <form>
            <v-card>
              <v-col
                cols="12"
                sm="10"
              >
                <v-text-field
                  v-model="username"
                  label="Solo"
                  placeholder="Username"
                  :counter="16"
                  solo
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                >
                </v-text-field>
                <v-btn
                  color="primary"
                  block
                  @click="createGame()"
                >
                  Créer une partie
                </v-btn>
                <br>
                <v-row>
                  <v-col
                    cols="6"
                    sm="4"
                  >
                    <v-text-field
                      v-model="gameId"
                      placeholder="Game Id"
                      solo
                    >
                    </v-text-field>

                  </v-col>
                  <v-col
                    cols="6"
                    sm="8"
                  >
                    <v-btn
                      color="secondary"
                      block
                      @click="joinGame"
                    >
                      Rejoindre cette partie
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-card>
          </form>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

// import io from "socket.io"


// import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  mixins: [validationMixin],
  validations: {
    username: { required, maxLength: maxLength(16) },
  },

  data () {
    return {
      username: null,
      gameId: null,
    }
  },
  sockets: {
    newGame: function (game) {
      this.$store.commit("resetMessage")
      this.$store.commit('setPlayer', game.players[game.players.length - 1])
      this.$store.commit('setGame', game)
      this.$router.push({ name: 'game', params: { id: game.id } })
    },
    newPlayer: function (game) {
      this.$store.commit("resetMessage")
      this.$store.commit('setPlayer', game.players[game.players.length - 1])
      this.$store.commit('setGame', game)
      this.$router.push({ name: 'game', params: { id: game.id } })
    },

    err: function (err) {
      console.log(err)
    }
  },
  methods: {
    createGame: function () {
      this.$socket.emit('createGame', this.username)
    },
    joinGame: function () {
      this.$socket.emit('joinGame', {
        username: this.username,
        gameId: this.gameId
      })
    }
  }
}
</script>
