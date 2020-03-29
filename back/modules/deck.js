const Card = require('./card')
const utils = require('./utils')

defaultDeck = [
    0, 0,
    1, 1, 1, 1, 1, 1,
    2, 2,
    3, 3,
    4, 4,
    5, 5,
    6, 6,
    7,
    8,
    9]

class Deck {
    constructor() {
        // pile de carte
        // this.cards = [...defaultDeck]
        this.cards = utils.shuffle([...defaultDeck])
        this.discardDeck = []
    }
    nextCard () {
        return this.cards.pop()
    }
    discardCard (card) {
        this.discardDeck.push(card)
    }
    isEmpty () {
        return this.cards.length == 0
    }

}

module.exports = Deck
