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
                        <span
                            v-if="player.hasHandmaid"
                        >
                            <v-img
                                class="icone"
                                :src="iconsBaseURL + 'handmaid.png'"
                                alt="Servante"
                                title="Servante"
                                width="3em"
                            ></v-img>
                        </span>
                        <span
                            v-if="player.hasSpy"
                        >
                            <v-img
                                class="icone"
                                :src="iconsBaseURL + 'spy.png'"
                                alt="Espionne"
                                title="Espionne"
                                width="3em"
                            ></v-img>
                        </span>
                    </p>
                </v-card-text>
            </v-card>
        </div>

        <div
            class="me"
            v-show="!isMyTurn"
        >
            <h2 class="monNom">{{ me.username }}</h2>
            <p class="icones">
                <span
                    v-if="me.hasHandmaid"
                >
                    <v-img
                        class="icone"
                        :src="iconsBaseURL + 'handmaid.png'"
                        alt="Servante"
                        title="Servante"
                        width="3em"
                    ></v-img>
                </span>
                <span
                    v-if="me.hasSpy"
                >
                    <v-img
                        class="icone"
                        :src="iconsBaseURL + 'spy.png'"
                        alt="Espionne"
                        title="Espionne"
                        width="3em"
                    ></v-img>
                </span>
            </p>
            <v-card
                width="220px"
                height="320px"
                elevation="24"
                color="rgba(255, 255, 255, 0.7)"
            >
                <v-img
                    :src="cardsBaseURL + cards[me.card].src"
                    :alt="'Carte ' + cards[me.card].altTitle"
                    width="100%"
                    height="100%"
                    :title="'La carte ' + cards[me.card].altTitle"
                ></v-img>
            </v-card>
        </div>

        <v-overlay
            v-if="isMyTurn"
            opacity=0.6
        >
            <h2
                v-show="hasToPlayACard && !hasToDiscard"
                class="action"
            >
                Sélectionner une carte à jouer :
            </h2>

            <h3
                v-show="errorContess"
                class="action erreur"
            >
                Vous ne pouvez jouer que la comtesse !!!
            </h3>

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
                :items="choosableOpponents(card)"
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

        <v-overlay
            v-if="priestCard"
        >
            <h2
                class="action"
            >
               Voici la carte de {{ me.opponent.username }} :
            </h2>
            <v-img
                :src="cardsBaseURL + cards[me.opponent.card].src"
                :alt="'Carte ' + cards[me.opponent.card].altTitle"
                :title="'La carte ' + cards[me.opponent.card].altTitle"
                width="220px"
                height="320px"
            ></v-img>

            <v-btn @click="priestCard = false">
                Fermer
            </v-btn>
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
                errorContess: false,
                chancellorCards: null,
                opponent: null,
                guess: null,
                card: null,
                priestCard: false
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
            choosableCards: function() {
                return [this.me.card, ...this.me.nextCards]
            },
            hasOpponent: function(card) {
                return this.choosableOpponents(card).length != 0
            },
            selectedCard: function(card) {
                if ((card == 5 || card == 7) && this.choosableCards().includes(8)) {
                    this.errorContess = true
                    return
                }
                this.errorContess = false
                this.hasToPlayACard = false
                this.card = card

                if (card == 0 || card == 4 || card == 8 || card == 9) {
                    this.hasToPlayACard = true
                    this.$socket.emit('cardSelected', {
                        gameId: this.game.id,
                        playedCard: card
                    })
                } else if (card == 6) {
                    this.$socket.emit('cardSelected', {
                        gameId: this.game.id,
                        playedCard: card
                    })
                } else if (!this.hasOpponent) {
                    this.hasToPlayACard = true
                    this.$socket.emit('cardSelected', {
                        gameId: this.game.id,
                        playedCard: card + 10
                    })
                } else {
                    this.hasToChooseAnOpponent = true
                    if (card == 1) {
                        this.hasToGuess = true
                    }
                }
            },
            isAChoosableOpponent: function(player, card) {
                return !(player.hasHandmaid || player.isDead || ((player.id == this.me.id) && (card != 5)))
            },
            choosableOpponents: function(card) {
                return this.game.players.filter(player => this.isAChoosableOpponent(player, card))
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
                    playedCard: this.card,
                    opponentId: this.opponent,
                    guessedCard: this.guess
                })
                
                if (this.card == 2) {
                    this.priestCard = true
                }

                this.guess = null
                this.opponent = null
                this.hasToGuess = false
                this.hasToChooseAnOpponent = false
                this.hasToPlayACard = true
            },
            chancellorKeep: function(cardToKeep) {
                let index = [this.me.card, ...this.me.nextCards].indexOf(cardToKeep)
                this.chancellorCards = [this.me.card, ...this.me.nextCards]
                this.chancellorCards.splice(index, 1)
                this.hasToPutACardToTheEnd = true
                this.hasToChooseACard = false
            },
            chancellorPlay: function(cardToTheEnd) {
                this.hasToPutACardToTheEnd = false
                this.hasToPlayACard = true
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

    .monNom {
        display: inline;
    }

    .icones {
        margin: 0;
        padding: 0;
    }

    .icones > span {
        margin: 0;
        padding: 0;
        display: inline;
    }

    .action {
        text-align: center;
    }

</style>