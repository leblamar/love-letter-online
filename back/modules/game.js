const utils = require('./utils')
const Player = require('./player')
const Deck = require('./deck')

cards = ["Spy", "Guard", "Priest", "Baron", "Handmaid", "Prince", "Chancellor", "King", "Countess", "Princess"]
class Game {

    constructor(username) {
        this.id = utils.id()
        this.maxPlayer = 8
        this.hasStarted = false
        this.players = [new Player(username)]
        this.socket = 'room-' + this.id
    }
    // Lobby
    addPlayer (username) {
        this.players.push(new Player(username))
    }

    isFull () {
        return this.players.length == this.maxPlayer
    }

    // Launching game
    launchGame () {
        this.hasStarted = true
        this.deck = new Deck()
        this.currentPlayer = 0
        this.alivePlayers = this.players.length

        // Donner une carte à chacun
        this.players.forEach((player) => player.setCard(this.deck.nextCard()))

        // défausser une carte au début
        this.deck.discardCard(this.deck.nextCard())
    }
    // Game finished
    isFinished () {
        return this.deck.isEmpty() || this.alivePlayers <= 1
    }

    // Game started
    playerTurn () {
        // Current player
        var player = this.players[this.currentPlayer]
        player.setNextCard(this.deck.nextCard())
    }
    nextTurn () {
        this.currentPlayer = (++this.currentPlayer) % this.players.length
        while (this.currentPlayer.isDead) {
            this.currentPlayer = (this.currentPlayer++) % this.players.length
        }
        this.playerTurn()
    }
    playerTurnMessage () {
        var player = this.players[this.currentPlayer]
        return "C'est au tour de " + player.username
    }
    playerPlayMessage (cardId, opponentId) {
        var player = this.players[this.currentPlayer]
        var message = player.username + " has played " + cards[cardId]

        return opponentId ? message + " against " + this.players.find((player) => player.id == opponentId).username : message
    }

    killPlayer (player) {
        player.isDead = true

        // this.players.splice(this.players.indexOf(player), 1)
        // this.deadPlayers.push(player)
        this.alivePlayers--

        this.deck.discardCard(player.card)
    }

    playTurn (play) {
        // Current Player
        var player = this.players[this.currentPlayer]
        player.removeTemporaryStatus()

        //
        var { playedCard } = play

        // Played card
        player.playCard(playedCard)
        this.deck.discardCard(playedCard)

        // Message
        var message = "Not yet implemented"

        // Opponent
        var { opponentId, guessedCard } = play
        var opponentPlayer = this.players.find((player) => player.id == opponentId)

        switch (playedCard) {
            // Spy
            case 0:
                player.hasPlayedSpy()
                message = player.username + " now spy the kingdom"
                break

            // Guard
            case 1:
                if (opponentPlayer.card == guessedCard) {
                    this.killPlayer(opponentPlayer)
                    message = player.username + " killed " + opponentPlayer.username + " with a guard"
                }
                else {
                    message = player.username + " missed his shot"
                }
                break

            // Priest
            case 2:
                player.hasPlayedPriest({
                    id: opponentPlayer.id,
                    card: opponentPlayer.card
                })
                message = player.username + " made his best pray"
                break

            // Baron
            case 3:
                if (opponentPlayer.card < player.card) {
                    this.killPlayer(opponentPlayer)
                    message = player.username + " has a bigger one"
                }
                else if (opponentPlayer.card > player.card) {
                    this.killPlayer(player)
                    message = opponentPlayer.username + " has a bigger one"
                } else {
                    message = "Nothing happened between those two same chicks"
                }
                break

            // Handmaid
            case 4:
                player.hasPlayedHandmaid()
                message = player.username + " is protected until the next turn"
                break
            // Prince
            case 5:
                this.deck.discardCard(opponentPlayer.card)
                if (opponentPlayer.card == 9) {
                    this.killPlayer(opponentPlayer)
                    message = player.username + " lucky shot !"
                } else {
                    opponentPlayer.setCard(this.deck.nextCard())
                    message = opponentPlayer.username + " said goodbye to his dear card"
                }
                break

            // Chancellor
            case 6:
                player.setNextCards(this.deck.next2Cards())
                message = player.username + " is choosing ..."
                break

            // King
            case 7:
                var oldCard = player.card
                player.card = opponentPlayer.card
                opponentPlayer.card = oldCard
                message = "Oh they switched card :o"
                break

            // Countess
            case 8:
                message = "Maybe a Prince, maybe a King or maybe something else"
                break

            // Princess
            case 9:
                this.killPlayer(player)
                message = "That was a pleasure to meet you"
                break
        }

        // // Next player
        // this.currentPlayer = (this.currentPlayer + 1) % this.players.length

        return message
    }

    // Game end
    // Point
    checkPoint () {
        var players = this.players.filter((player) => !player.isDead)

        // Carte la plus haute
        var maxCard = Math.max(...players.map(player => player.card))
        players.filter(player => player.card == maxCard).forEach(player => player.points++)

        // Espionne
        players.filter((player) => player.hasSpy).forEach(player => player.points++)
    }
}

module.exports = Game