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

    // Draw card
    nextCard () {
        return this.cards.pop()
    }
    next2Cards () {
        if (this.cards.length == 0) {
            return []
        }
        else if (this.cards.length == 1) {
            return [this.nextCard()]
        }
        return [this.nextCard(), this.nextCard()]
    }

    // Discard card
    discardCard (card) {
        this.discardDeck.push(card)
    }

    // Chancellor
    getChancellored (cards) {
        this.cards.unshift(...cards)
    }

    // 
    isEmpty () {
        return this.cards.length == 0
    }

}

module.exports = Deck
