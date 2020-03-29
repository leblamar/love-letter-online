<template>
  <div>
    <br class="my-3">

    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
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

          <div class="headline">
            Choose a card
          </div>

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
                :items="game.players"
                :value="game.players[0]"
                item-text="username"
                item-value="id"
                label="Adversaire"
                v-model="opponent"
                solo
              ></v-select>
              <v-select
                v-if="hasToGuess"
                :items="cards"
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

          <!-- Cards -->
          <v-row justify="center">
            <v-card
              class="mx-2"
              @click="selectCard(player.card)"
            >
              <v-card-title>
                {{ player.card }}
              </v-card-title>
            </v-card>
            <v-card
              class="mx-2"
              @click="selectCard(card)"
              v-for="(card, index) in player.nextCards"
              :key="index"
            >
              <v-card-title>
                {{ card }}
              </v-card-title>
            </v-card>
          </v-row>
        </div>

        <div class="display-1">
          Alive Players
        </div>
        <v-list>
          <v-list-item
            v-for="player in game.players"
            :key="player.username"
          >
            <v-list-item-content>
              <v-list-item-title class="title">
                <span>
                  {{ player.username }}
                </span>
                <span v-if="player.hasSpy">
                  | SPY
                </span>
                <span v-if="player.hasHandMaid">
                  | HANDMAID
                </span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <br>

        <div class="display-1">
          Messages
        </div>
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
      hasToChooseAnOpponent: false,
      opponent: null,
      hasToGuess: false,
      guess: null,
      cards: ["Spy", "Guard", "Priest", "Baron", "Handmaid", "Prince", "Chancellor", "King", "Countess", "Princess"]
    }
  },
  methods: {
    selectCard (cardId) {
      this.cardId = cardId

      if (cardId == 0 || cardId == 4 || cardId == 6 || cardId == 8 || cardId == 9) {
        this.socketCardSelected(cardId)
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
    socketCardSelected (cardId) {
      this.$socket.emit('cardSelected', {
        gameId: this.game.id,
        playedCard: cardId
      })
    }
  },
}
</script>