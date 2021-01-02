const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startGameBtn = document.querySelector('.btn__reset');
const ol = document.querySelector('.section ol');
const ul = phrase.querySelector('ul');
const overlay = document.querySelector('#overlay');
const lifePts = ol.querySelectorAll('li')

let playerLife = 5;

const phrases = [
    'you silly goose',
    'can you tell me why',
    'how are you',
    'give me the word',
    'hello world'
];

// START GAME
overlay.addEventListener('click', (event) => {
    if(event.target.tagName === 'A') {
        newGame();
    } 
})


const newGame = () => {
    clearOverlay();
    clearKeyboard();
    clearDisplayPhrase();
    addLifePts();
    const randomPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(randomPhrase);
}

// RESET FUNCTIONS

const createResetBtn = () => {
    playAgainBtn = document.createElement('a')
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.classList.add('btn__again')
    overlay.replaceChild(playAgainBtn, overlay.firstElementChild.nextElementSibling);
}

const clearKeyboard = () => {
    const buttons = document.querySelectorAll('.keyrow button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('chosen')
        buttons[i].removeAttribute("disabled");
    }
}

const addLifePts = () => {
    playerLife = 5;
    for (let i = 0; i < lifePts.length; i++) { // add icons back on scoreboard
        ol.appendChild(lifePts[i]);
    }
}

const clearOverlay = () => {
    const lastChild = overlay.lastElementChild;
    if (lastChild.tagName === 'H3') { // safeguard so <a> won't get remove at the start
        overlay.removeChild(lastChild); // removes win/lose message
    }
    overlay.className = '';
    overlay.style.display = 'none';
}
// removes all <li> inside of <ul>
const clearDisplayPhrase = () => {
    ul.innerText = '';
}


const getRandomPhraseAsArray = (arr) => {
    const randomNum = Math.floor(Math.random() * 5); // generates a number between 0 & 4
    const randomPhrase = arr[randomNum];
    const arrOfChar = randomPhrase.split("");
    return arrOfChar;
}

// adds each random phrase character to be displayed
const addPhraseToDisplay = (arrOfChar) => {
    for(let i = 0; i < arrOfChar.length; i++) {
        const li = document.createElement('li');
        li.textContent = arrOfChar[i];
        if (arrOfChar[i] !== ' ') {
            li.classList.add('letter');
        } else {
            li.classList.add('space')
        }
        ul.appendChild(li);
    }
}

const checkLetter = (selectedLetter) => {
    const letters = phrase.querySelectorAll('li.letter');
    let matchedLetter = null;
    for(let i = 0; i < letters.length; i++) {
        if (letters[i].textContent === selectedLetter.textContent) {
            letters[i].classList.add('show');
            matchedLetter = letters[i].textContent;
        } 
    } 
    return matchedLetter;
}

// keyboard event listener
qwerty.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const button = event.target;
        button.classList.add('chosen');
        const letterFound = checkLetter(button);

        if (letterFound === null) {
            playerLife = playerLife - 1;
            ol.removeChild(ol.lastElementChild);
            button.setAttribute('disabled', '')
        }
    }
    checkWin();
});  
    

const checkWin = () => {
    const letters = phrase.querySelectorAll('li.letter');
    const lettersShow = phrase.querySelectorAll('li.show');

    if (letters.length === lettersShow.length) {
        setTimeout(showMsg, 500, 'win', 'Winner Winner!') // The last letter press will overlap with win overlay without this delay added
    } else if (playerLife === 0) {
        showMsg('lose', 'Maybe Next Time!')
    }
}


const showMsg = (resultStr, msgStr) => {
    showOverlay(resultStr);
    resultMessage(msgStr);
    createResetBtn();
}
// show overlay depending on win/lose situation
const showOverlay = (resultStr) => {
    overlay.className = resultStr;
    overlay.style.display = '';
}
// creates and add h3 message
const resultMessage = (msgStr) => {
    const h3 = document.createElement('h3');
        h3.textContent = msgStr;
        overlay.appendChild(h3);
}


