# Love Letter online backend

## Setup

### Initialisation

```
npm install
```

### Lancement

```
npm start
```

## Documentations

### Models

#### Player

```js
{
    "id": Number,
    "username": String,

    "card": Number,
    "nextCards": [Number],


    "hasSpy": Boolean,
    "hasHandmaid": Boolean,
    "opponent": Player,

    "isDead": Boolean,

    "points": Number,
}
```

#### Game

```js
{
    "id": Number,
    "socket": String,

    "maxPlayer": Number,
    "hasStarted": Boolean,

    "players": [Player],
    "deck": Deck <=> [Number],
    "currentPlayer": Number,
    "alivePlayers": Number,
}
```

### Sockets

#### On

* Connection : `connection`
* Créer une nouvelle partie : `createGame`

```js
    "username": String
```

* Rejoindre une partie: `joinGame`

```js
{
    "gameId": Number,
    "username": String,
}
```

* Lancement d'une partie : `launchGame`

```js
    "gameId": Number
```

* Selection d'une carte : `cardSelected`

```js
{
    "gameId": Number,
    "playerId": Number,
    "playedCard": Number,
    "opponentId": Number,
    "guessedCard": Number,
}
```

* Choix définitif du chancellier : `chancellorEnd`

```js
{
    "gameId": Number,
    "playerId": Number,
    "cards": [Number],
}
```

#### Emit

* Erreur : `err`

```js
{
    "err": String,
}
```

* Nouvelle partie créée : `createGame`

```js
    "game": Game
```

* Nouveau joueur : `newPlayer`

```js
    "game": Game
```

* Partie lancée : `gameLaunched`

```js
    "game": Game
```

* Au tour du joueur suivant : `playerTurn`

```js
    "game": Game
```

* Carte jouée par le joueur : `cardSelected`

```js
    "message": String
```

* Effet de la carte jouée par le joueur : `cardEffect`

```js
    "message": String
```

* Début du choix du chancellier : `chancellorStart`

```js
    "game": Game
```

* Fin de la partie : `gameEnd`

```js
    "game": Game
```
