var io = require('https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js%27')(3001)

let socket = io()

let create = document.getElementById("create")

create.addEventListener("click", createGame)

function createGame() {
    let username = document.getElementById("username")
    if (correctUsername(username.value)) {
        console.log("Get username : " + username.value)
        username.value = ""
        socket.emit("createGame", username.value)
        
    } else {
        console.log("Username : " + username.value + " incorrect.")
        username.value = ""
    }
    username.value = ""
}

function correctUsername(username) {
    return 4 <= username.length && username.length <= 12
}

socket.on("newGame", function(game) {
    localStorage.setItem("game", game)
    document.location.href = "http://localhost:8080/waiting-game.html"
})
