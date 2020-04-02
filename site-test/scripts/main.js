let requestURL = "file:///home/leblamar/Projets_perso/love-letter-online/site-test/scripts/cards.json"
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
    if (cardNumber > 0) {
        cardNumber--
        afficherCarte()
    }
}

function nextOne() {
    if (cardNumber < 9) {
        cardNumber++
        afficherCarte()
    }
}

function afficherCarte() {
    let currentCard = cards[cardNumber]

    let image = document.getElementById("card")
    image.src = currentCard["src"]
    image.alt = "Carte " + currentCard["altTitle"]
    image.title = "La carte " + currentCard["altTitle"]

    let shortDesc = document.getElementById("shortDesc")
    shortDesc.textContent = "<strong>" + currentCard["name"] + "</strong> : Valeur " + currentCard["value"] + ", " + currentCard["numberOfCopies"] + " Exemplaire."

    let cardDesc = document.getElementById("cardDesc")
    cardDesc.textContent = currentCard["cardDesc"]
}
