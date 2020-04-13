<template>
    <div id="playingRoom">
        <div
            class="otherPlayer"
            v-for="(player, index) in game.players"
            :key="player.id"
        >
            <v-card
                v-if="player.id != me.id"
                :style="{
                    top: computeYPos(player, index) + 'vh',
                    left: computeXPos(player, index) + 'vw'
                }"
                :elevation="isPlayerTurn(index) ? 24 : 0"
                width="10vw"
                :color="player.isDead ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.7)'"
            >
                <v-card-title>{{ player.username }}</v-card-title>
                <v-card-text>
                    <p class="icones">
                        <scan
                            v-if="player.hasHandMaid"
                        >
                            <v-img
                                class="icone"
                                :src="iconsBaseURL + 'handmaid.png'"
                                alt="Servante"
                                title="Servante"
                            ></v-img>
                        </scan>
                        <scan
                            v-if="player.hasSpy"
                        >
                            <v-img
                                class="icone"
                                :src="iconsBaseULR + 'spy.png'"
                                alt="Espionne"
                                title="Espionne"
                            ></v-img>
                        </scan>
                    </p>
                </v-card-text>
            </v-card>
        </div>

        <div
            class="me"
            v-show="!isMyTurn"
        >
            <h2>{{ me.username }}</h2>
            <v-card
                height="30vh"
                width="11.5vw"
                elevation="24"
                color="rgba(255, 255, 255, 0.7)"
            >
                <v-img
                    :src="cardsBaseURL + me.card.src"
                    :alt="'Carte ' + me.card.altTitle"
                    width="100%"
                    height="100%"
                    :title="'La carte ' + me.card.altTitle"
                ></v-img>
            </v-card>
        </div>

        <v-overlay
            v-if="isMyTurn"
            opacity=0.6
        >
            <h2
                v-show="hasToPlayACard"
                class="action"
            >
                Sélectionner une carte à jouer :
            </h2>
            
            <v-row
                justify="center"
                v-if="!hasToPlayACard"
            >
                <v-card
                    width="220px"
                    height="320px"
                >
                    <v-img
                        :src="cardsBaseURL + cards[card].src"
                        :alt="'Carte ' + cards[card].altTitle"
                        :title="'La carte ' + cards[card].altTitle"
                        width="100%"
                        height="100%"
                    ></v-img>
                </v-card>
            </v-row>

            <h2
                v-show="hasToChooseACard"
                class="action"
            >
                Sélectionner une carte à garder :
            </h2>

            <v-row
                justify="center"
                v-show="hasToPlayACard || hasToChooseACard"
            >
                <v-col
                    v-for="(cardToChoose, index) in [me.card, ...me.nextCards]"
                    :key="index"
                >
                    <v-card
                        width="220px"
                        height="320px"
                        hover
                        @click="hasToPlayACard ? selectedCard(cardToChoose) : chancellorKeep(cardToChoose)"
                    >
                        <v-img
                            :src="cardsBaseURL + cards[cardToChoose].src"
                            :alt="'Carte ' + cards[cardToChoose].altTitle"
                            :title="'La carte ' + cards[cardToChoose].altTitle"
                            width="100%"
                            height="100%"
                        ></v-img>
                    </v-card>
                </v-col>
            </v-row>

            <h2
                v-show="hasToChooseAnOpponent"
                class="action"
            >
                Vous devez choisir un adversaire :
            </h2>
            <v-select
                v-show="hasToChooseAnOpponent"
                :items="game.players.filter(player => choosableOpponent(player))"
                item-text="username"
                item-value="id"
                label="Choisir un adversaire"
                v-model="opponent"
                solo
            ></v-select>
            
            <h2
                v-show="hasToGuess"
                class="action"
            >
                Vous devez choisir un personnage :
            </h2>
            <v-select
                v-show="hasToGuess"
                :items="cards.filter((card => card.value != 1))"
                item-text="name"
                item-value="value"
                label="Choisir un personnage"
                v-model="guess"
                solo
            ></v-select>

            <v-btn
                v-show="hasToChooseAnOpponent"
                :disabled="hasChoosedOpponent()"
                @click="choosedOpponent"
            >
                Valider
            </v-btn>

            <h2
                v-show="hasToPutACardToTheEnd"
                class="action"
            >
                Sélectionner la carte que
            </h2>
            <h2
                v-show="hasToPutACardToTheEnd"
                class="action"
            >
                vous voulez mettre en dernier :
            </h2>

            <v-row
                justify="center"
                v-show="hasToPutACardToTheEnd"
            >
                <v-col
                    v-for="(cardToTheEnd, index) in chancellorCards"
                    :key="index"
                >
                    <v-card
                        width="220px"
                        height="320px"
                        hover
                        @click="chancellorPlay(cardToTheEnd)"
                    >
                        <v-img
                            :src="cardsBaseURL + cards[cardToTheEnd].src"
                            :alt="'Carte ' + cards[cardToTheEnd].altTitle"
                            :title="'La carte ' + cards[cardToTheEnd].altTitle"
                            width="100%"
                            height="100%"
                        ></v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-overlay>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    
    export default {
        name: 'PlayingRoom',
        data () {
            return {
                radius: 38,
                cardsBaseURL: "http://localhost:8080/images/cards/",
                iconsBaseURL: "http://localhost:8080/images/icons/",
                hasToPlayACard: true,
                hasToChooseAnOpponent: false,
                hasToGuess: false,
                hasToChooseACard: false,
                hasToPutACardToTheEnd: false,
                chancellorCards: null,
                opponent: null,
                guess: null,
                card: null
            }
        },
        sockets: {
            chancellorStart: function(game) {
                if (this.isMyTurn) {
                    this.$store.commit('setGame', game)
                    this.hasToChooseACard = true
                }
            }
        },
        computed: {
            ...mapState({
                game: 'game',
                me: 'player',
                cards: 'cards',
                messages: 'messages'
            }),
            ...mapGetters([
                'isMyTurn'
            ]),
            myIndex: function() {
                let index = 0
                while (this.me.id != this.game.players[index].id) {
                    index++
                }
                return index
            }
        },
        methods: {
            computeYPos: function(player, index) {
                let alpha = 2 * Math.PI / this.game.players.length
                let nbPlayers = this.game.players.length
                let playerLocalIndex = (nbPlayers + index - this.myIndex) % nbPlayers
                return 40 + this.radius*Math.sin(Math.PI/2 + playerLocalIndex*alpha)
            },
            computeXPos: function(player, index) {
                let alpha = 2 * Math.PI / this.game.players.length
                let nbPlayers = this.game.players.length
                let playerLocalIndex = (nbPlayers + index - this.myIndex) % nbPlayers
                return 45 + this.radius*Math.cos(Math.PI/2 + playerLocalIndex*alpha)
            },
            isPlayerTurn: function(index) {
                return index == this.game.currentPlayer
            },
            selectedCard: function(card) {
                this.hasToPlayACard = false
                this.card = card

                if (card == 0 || card == 4 || card == 8 || card == 9) {
                    this.$socket.emit('cardSelected', {
                        gameId: this.game.id,
                        playedCard: card
                    })
                    this.hasToPlayACard = true
                } else if (card == 6) {
                    this.$socket.emit('cardSelected', {
                        gameId: this.game.id,
                        playedCard: card
                    })
                } else {
                    this.hasToChooseAnOpponent = true
                    if (card == 1) {
                        this.hasToGuess = true
                    }
                }
            },
            choosableOpponent: function(player) {
                return !player.hasHandMaid && !player.isDead && !((player.id == this.me.id) && (this.card != 5))
            },
            hasChoosedOpponent: function() {
                if (this.hasToGuess) {
                    return (this.opponent == null) || (this.guess == null)
                } else {
                    return this.opponent == null
                }
            },
            choosedOpponent: function() {
                this.$socket.emit('cardSelected', {
                    gameId: this.game.id,
                    playerCard: this.card,
                    opponentId: this.opponent,
                    guessedCard: this.guess
                })

                this.guess = null
                this.opponent = null
                this.hasToGuess = false
                this.hasToChooseAnOpponent = false
                this.hasPlayedACard = false
            },
            chancellorKeep: function(cardToKeep) {
                this.chancellorCards = [this.me.card, ...this.me.nextCards].filter(card => card != cardToKeep)
                this.hasToPutACardToTheEnd = true
                this.hasToChooseACard = false
            },
            chancellorPlay: function(cardToTheEnd) {
                this.hasToPutACardToTheEnd = false
                if (this.chancellorCards[0] == cardToTheEnd) {
                    this.chancellorCards.reverse()
                }
                this.$socket.emit('chancellorEnd', {
                    gameId: this.game.id,
                    cards: this.chancellorCards
                })
            }
        }
    }
</script>

<style>
    #playingRoom {
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
    }

    .otherPlayer {
        position: absolute;
    }

    .me {
        position: absolute;
        bottom: 0vh;
        left: 44.25vw;
    }

    .icones {
        margin: 0;
        padding: 0;
    }

    .icones > scan {
        margin: 0;
        padding: 0;
    }

    .action {
        text-align: center;
    }

</style>