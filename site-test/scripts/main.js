let myImage = document.querySelector('img')

myImage.addEventListener('click', function() {
    let mySrc = myImage.getAttribute('src')
    if (mySrc === 'images/love-letter.jpeg') {
        myImage.setAttribute('src', 'images/real-love-letter.jpg')
    } else {
        myImage.setAttribute('src', 'images/love-letter.jpeg')
    }
})

let myButton = document.querySelector('button')
let myHeading = document.querySelector('h1')

function setUserName() {
    let myName = prompt('Veuillez saisir votre nom.')
    localStorage.setItem('nom', myName)
    myHeading.textContent = 'Love letter est vraiment le meilleur jeu, ' + myName
}

if (!localStorage.getItem('nom')) {
    setUserName()
} else {
    let storedName = localStorage.getItem('nom')
    myHeading.textContent = 'Love letter est vraiment le meilleur jeu, ' + storedName
}

myButton.addEventListener('click', function() {
    setUserName()
})

// Le vrai challenge commence ici :
let myImage = document.querySelector('card')
