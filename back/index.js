var app = require('express')()
app.use(require('cors')())
// Serveur : 3000
var port = process.env.PORT || 3000
// Web socket : 3001
var io = require('socket.io')(3001)

// import { id } from './utils'
const utils = require('./modules/utils')
const Player = require('./modules/player')
const Game = require('./modules/game')
// var { Player } = require('/player')


var games = []


io.on('connection', function (socket) {
    console.log("New connection")

    /**
     * Create a new game room and notify the creator of game. 
     */
    socket.on('createGame', function (username) {
        // new game
        var game = new Game(username)
        games.push(game)

        // Socket
        socket.join(game.socket)
        socket.emit('newGame', game)
    })

    /**
     * Connect the Player 2 to the room he requested. Show error if room full.
     */
    socket.on('joinGame', function (data) {
        // Data
        var { username, gameId } = data

        // Game
        var game = games.find((game) => game.id == gameId)

        // Verification
        if (!game) {
            socket.emit('err', { err: 'Cette partie n\'existe pas' })
            return
        }
        if (game.isFull()) {
            socket.emit('err', { err: 'Cette partie est complète' })
            return
        }
        if (game.hasStarted) {
            socket.emit('err', { err: 'Cette partie a déjà commencé' })
            return
        }

        // New player
        game.addPlayer(username)

        // Socket
        socket.join(game.socket)
        socket.broadcast.to(game.socket).emit('newPlayer', game)
        socket.emit('newPlayer', game)
    })

    socket.on('launchGame', function (id) {
        var game = games.find((game) => game.id == id)
        game.launchGame()
        // Game launched
        socket.emit('gameLaunched', game)
        socket.broadcast.to(game.socket).emit('gameLaunched', game)

        // Player turn 
        game.playerTurn()

        socket.emit('playerTurn', game)
        socket.broadcast.to(game.socket).emit('playerTurn', game)
    })

    socket.on('cardSelected', function (data) {
        console.log(data)
        var { playerId, gameId, playedCard, opponent, guess } = data

        var game = games.find((game) => game.id == gameId)

        // Card Alert
        var message = game.playerPlayMessage(playedCard, opponent)
        // Socket card alert
        socket.emit('cardSelected', message)
        socket.broadcast.to(game.socket).emit('cardSelected', message)

        // Card effect
        var message = game.playTurn({
            playedCard,
            opponent,
            guess
        })

        // Socket card effect
        socket.emit('cardEffect', message)
        socket.broadcast.to(game.socket).emit('cardEffect', message)

        // Game end
        if (game.isFinished()) {
            game.checkPoint()
            socket.emit('gameEnd', game)
            socket.broadcast.to(game.socket).emit('gameEnd', game)
            return
        }

        // Chancellor turn
        if (playedCard == 6) {
            socket.emit('chancellorStart', game)
            socket.broadcast.to(game.socket).emit('chancellorStart', game)
            return
        }

        // Next turn
        game.nextTurn()
        socket.emit('playerTurn', game)
        socket.broadcast.to(game.socket).emit('playerTurn', game)
    })

    // Chancellor mange tes morts
    socket.on('chancellorEnd', function (data) {
        console.log(data)
        var { playerId, gameId, cards } = data

        var game = games.find((game) => game.id == gameId)

        game.deck.getChancellored(cards)

        // Next turn
        game.nextTurn()
        socket.emit('playerTurn', game)
        socket.broadcast.to(game.socket).emit('playerTurn', game)
    })

    /**
     * Notify the players about the victor.
     */
    socket.on('gameEnded', function (data) {
        socket.broadcast.to(data.room).emit('gameEnd', data)
    })

})

app.listen(port, function () {
    console.log('listening on *:' + port)
})
