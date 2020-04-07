let baseURL = "http://localhost:8080/"
let requestURL = baseURL + "scripts/cards.json"
let request = new XMLHttpRequest()
request.open("GET", requestURL)
request.responseType = "json"
request.send()

let cardNumber = 0;
let cards;

request.onload = function() {
    cards = request.response
    afficherCarte()
}

let previousScan = document.getElementById("previous")
let nextScan = document.getElementById("next")

previousScan.addEventListener("click", previousOne)
nextScan.addEventListener("click", nextOne)

function previousOne() {
    cardNumber = (cardNumber + 9) % 10
    afficherCarte()
}

function nextOne() {
    cardNumber = (cardNumber + 1) % 10
    afficherCarte()
}

function afficherCarte() {
    let currentCard = cards[cardNumber]

    let image = document.getElementById("card")
    image.src = baseURL + "images/cards/" + currentCard["src"]
    image.alt = "Carte " + currentCard["altTitle"]
    image.title = "La carte " + currentCard["altTitle"]

    let shortDesc = document.getElementById("shortDesc")
    shortDesc.innerHTML = "<strong>" + currentCard["name"] + "</strong> : Valeur " + currentCard["value"] + ", " + currentCard["numberOfCopies"] + " Exemplaire."

    let cardDesc = document.getElementById("cardDesc")
    cardDesc.innerHTML = currentCard["cardDesc"]
}
