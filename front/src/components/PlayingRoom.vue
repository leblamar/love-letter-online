<template>
  <div>
    <br class="my-3">

    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
      >
        <div class="display-1">
          My hand
        </div>
        <div v-if="!isMyTurn">
          <v-row justify="center">
            <v-card>
              <v-card-title>
                {{ player.card }}
              </v-card-title>
            </v-card>
          </v-row>
        </div>

        <div v-else>

          <!-- Opponent -->
          <v-dialog
            v-model="hasToChooseAnOpponent"
            width="500"
          >
            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
                Choisir un adversaire
              </v-card-title>
              <v-select
                :items="game.players.filter(player => !player.hasHandmaid)"
                :value="game.players[0]"
                item-text="username"
                item-value="id"
                label="Adversaire"
                v-model="opponent"
                solo
              ></v-select>
              <v-select
                v-if="hasToGuess"
                :items="cards.filter((card) => card != this.cards[1])"
                label="Guess"
                v-model="guess"
                solo
              ></v-select>
              <v-card-cations>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="opponentSelected()"
                >
                  Valider
                </v-btn>
              </v-card-cations>
            </v-card>
          </v-dialog>

          <!-- Chancellor -->
          <div v-if="hasToChoose2Cards">
            <div class="headline">
              Choose 2 cards
            </div>
            <v-row justify="center">
              <v-card
                class="mx-2"
                @click="chancellorCard(card)"
                v-for="(card, index) in [player.card, ...player.nextCards]"
                :key="index"
              >
                <v-card-title>
                  {{ card }}
                </v-card-title>
              </v-card>
            </v-row>
          </div>

          <!-- Cards -->
          <div v-else>
            <v-row justify="center">
              <v-card
                class="mx-2"
                @click="selectCard(card)"
                v-for="(card, index) in [player.card, ...player.nextCards]"
                :key="index"
              >
                <v-card-title>
                  {{ card }}
                </v-card-title>
              </v-card>
            </v-row>
          </div>

        </div>

        <div class="display-1">
          Alive Players
        </div>
        <v-list>
          <v-list-item
            v-for="gamePlayer in game.players"
            :key="gamePlayer.username"
          >
            <v-list-item-content>
              <v-list-item-title class="title">
                <span>
                  {{ gamePlayer.username }}
                </span>
                <span v-if="gamePlayer.hasSpy">
                  | SPY
                </span>
                <span v-if="gamePlayer.hasHandmaid">
                  | HANDMAID
                </span>
                <span v-if="player.opponent && gamePlayer.id == player.opponent.id">
                  | {{ player.opponent.card }}
                </span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <br>

        <div class="display-1">
          Messages
        </div>
        <v-container
          class="overflox-y-auto"
          style="max-height: 400px;"
        >

          <v-list>
            <v-list-item
              v-for="(message, index) in messages"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="title"
                  v-text="message"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-container>

      </v-col>
    </v-row>

  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      game: 'game',
      player: 'player',
      messages: 'messages'
    }),
    ...mapGetters([
      'isMyTurn'
    ])
  },
  data () {
    return {
      cardId: null,
      // Chancellor
      hasToChoose2Cards: false,
      choosenCards: [],
      // Attack card
      hasToChooseAnOpponent: false,
      opponent: null,
      // Guard
      hasToGuess: false,
      guess: null,
      // cards
      cards: ["Spy", "Guard", "Priest", "Baron", "Handmaid", "Prince", "Chancellor", "King", "Countess", "Princess"]
    }
  },
  sockets: {
    chancellorStart: function (game) {
      if (this.isMyTurn) {
        this.$store.commit('setGame', game)
        this.hasToChoose2Cards = true
      }
    }
  },
  methods: {
    selectCard (cardId) {
      this.cardId = cardId

      if (cardId == 0 || cardId == 4 || cardId == 6 || cardId == 8 || cardId == 9) {
        this.$socket.emit('cardSelected', {
          gameId: this.game.id,
          playedCard: cardId
        })
      }
      else {
        this.hasToChooseAnOpponent = true
        if (cardId == 1) {
          this.hasToGuess = true
        }
      }
    },
    opponentSelected () {
      this.$socket.emit('cardSelected', {
        gameId: this.game.id,
        playedCard: this.cardId,
        opponent: this.opponent,
        guess: this.cards.indexOf(this.guess)
      })

      this.guess = null
      this.opponent = null
      this.hasToGuess = false
      this.hasToChooseAnOpponent = false
    },
    chancellorCard (card) {
      this.choosenCards.push(card)
      if (this.choosenCards.length == 2) this.chancellor()
    },
    chancellor () {
      this.hasToChoose2Cards = false
      this.$socket.emit('chancellorEnd', {
        gameId: this.game.id,
        cards: this.choosenCards
      })
    }
  },
}
</script>