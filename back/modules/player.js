const utils = require('./utils')

class Player {
    constructor(username) {
        this.username = username
        this.id = utils.id()

        // Status
        this.hasSpy = false
        this.hasHandmaid = false
        this.opponent = null
        this.isDead = false

        this.points = 0
    }
    // Cards
    setCard (card) {
        this.card = card
    }
    setNextCard (card) {
        this.nextCards = [card]
    }
    setNextCards (cards) {
        this.nextCards = cards
    }
    hasCard (playedCard) {
        return [this.card, ...this.nextCards].find((card) => card == playedCard)
    }
    playCard (playedCard) {
        // console.log(playedCard)
        // if (!this.hasCard(playedCard)) {
        //     return
        // }

        this.card = this.card == playedCard ? this.nextCards[0] : this.card
        this.nextCards = null
    }

    // Status
    removeTemporaryStatus () {
        this.hasHandmaid = false
        this.opponent = null
    }
    hasPlayedSpy () {
        this.hasSpy = true
    }
    hasPlayedHandmaid () {
        this.hasHandmaid = true
    }
    hasPlayedPriest (opponent) {
        this.opponent = opponent
    }
    died () {
        this.isDead = true
    }
}

module.exports = Player
