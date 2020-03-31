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

### Sockets

#### On

* Connection : `connection`
* Créer une nouvelle partie : `createGame`

```
    (username: String)
```

* Rejoindre une partie: `joinGame`

```json
{
    "gameId": Number,
    "username": String,
}
```

* Lancement d'une partie : `launchGame`

```
    (gameId: Number)
```

* Selection d'une carte : `cardSelected`

```json
{
    "gameId": Number,
    "playerId": Number,
    "playedCard": Number,
    "opponentId": Number,
    "guessedCard": Number,
}
```

* Choix définitif du chancellier : `chancellorEnd`

```json
{
    "gameId": Number,
    "playerId": Number,
    "cards": [Number],
}
```

#### Emit

* Erreur : `err`

```json
{
    "err": String,
}
```

* Nouvelle partie créée : `createGame`

`(game: Game)`

* Nouveau joueur : `newPlayer`

```
    (game: Game)
```
