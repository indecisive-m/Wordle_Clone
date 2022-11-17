const wordleApiUrl = "https://thatwordleapi.azurewebsites.net/get/";
let wordleWord;
let finalWord;
let inputtedWordArray = [];
let gridIndex = 0;
let active = document.querySelector(`[data-index="${gridIndex}"]`);
let gridRowBoxes = document.querySelector(`[data-index="${gridIndex}"]`).getElementsByClassName('box');
let disabled = false;
const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const box = document.querySelectorAll('.box');
const qwerty = document.querySelectorAll('.qwerty');
const restart = document.querySelector('#restart').addEventListener('click', () => location.reload())
const newGame = document.querySelector('#new-game').addEventListener('click', () => location.reload())

const background = document.querySelector('.section');




// * Write with keyboard

document.addEventListener('keydown', (e) => {
    if(disabled === false) {
        if (alphabetArray.includes(e.key)) {
            writeLetterToGrid(e.key)
        } else if (e.key === 'Enter') {
            checkInputtedWordInApi(inputtedWordArray.join(''))
        } else if (e.key === 'Backspace') {
            removeLetterFromGrid()
        } 
    }
})



// * Write with onscreen keyboard

qwerty.forEach(letter => {
    letter.addEventListener('click', () => {
        if(disabled === false) {
            if(letter.textContent === 'enter') {
            checkInputtedWordInApi(inputtedWordArray.join(''))
    }    else if (letter.textContent === '') {
            removeLetterFromGrid()
    } else 
        writeLetterToGrid(letter.textContent)
}
    })
})


// * Get Word From API 

const getWordFromApi = async () => {
    const getDataFromApi =  await fetch(wordleApiUrl)
    const res = await getDataFromApi.json();
    wordleWord = res.Response
    console.log(wordleWord)
    return wordleWord
}


// * Checks if Inputted Word is in API - feels sloppy atm

const checkInputtedWordInApi = async (word) => {
    const checkWord = await fetch(`https://thatwordleapi.azurewebsites.net/ask/?word=${word}`)
    const res = await checkWord.json()
        if (res.Status === 200) {
            if(res.Response === true) {
                disabled = true;
                gameLogic()
                
            } else {
                const notInWordList = document.querySelector('.not-in-word-list');
                active = document.querySelector(`[data-index="${gridIndex}"]`);
                notInWordList.classList.remove('hidden')
                active.classList.add('shake')
                setTimeout(() => {
                    notInWordList.classList.add('hidden')
                    active.classList.remove('shake')
                },1500)
            }
        } else {
            active = document.querySelector(`[data-index="${gridIndex}"]`);
            const notEnoughLetters = document.querySelector('.not-enough-letters');
            notEnoughLetters.classList.remove('hidden')
           active.classList.add('shake')
            setTimeout(() => {
                notEnoughLetters.classList.add('hidden')
               active.classList.remove('shake')
            },1500)

        }
}



//* Game Logic

// TODO: if letter is in word once and already in right place, second letter is greyed out.
// TODO: if letter is in word twice and one is in right place and one wrong. It needs one green and one yellow
// TODO: if word has two of the same letters and both in wrong place. Both yellow.

const gameLogic = async () => {
    finalWord = wordleWord.split('')
    let correctLetterArray = [];
    let containsLetterArray = [];
    let notInWordArray = [];

    inputtedWordArray.forEach((item, index, arr) => {
        setTimeout(()=> {
            if (arr[index] === finalWord[index]) {
                gridRowBoxes[index].classList.add('correct-letter')
                correctLetterArray.push(finalWord[index])
            }  else {
                if (finalWord.includes(arr[index]) === true) {
                    gridRowBoxes[index].classList.add('contains-letter')
                    containsLetterArray.push(arr[index])
                } else {
                    gridRowBoxes[index].classList.add('not-in-word')
                    notInWordArray.push(gridRowBoxes[index].textContent)
                }
            }

        }, index * 350)
    })

    qwerty.forEach(item => {
        setTimeout(() => {
            if (correctLetterArray.includes(item.textContent)) {
                item.classList.add('qwerty-correct-letter')
            }
            if (containsLetterArray.includes(item.textContent)) {
                item.classList.add('qwerty-contains-letter')
            }
            if (notInWordArray.includes(item.textContent)) {
                item.classList.add('qwerty-not-in-word')
            }
        }, 2000)

        })

    if (finalWord.toString() === inputtedWordArray.toString()) {
       setTimeout(()=> {
           wonGame()
       },2000)
    } else reset()
}

// * Write letter to on screen grid

const writeLetterToGrid = (keypress) => {
    for(let i = 0; inputtedWordArray.length < 5 ; i++) {
        if (gridRowBoxes[i].classList.contains('text-within') === false){
            gridRowBoxes[i].textContent = keypress
            gridRowBoxes[i].classList.add('text-within')
            inputtedWordArray.push(keypress)
            break
        } else {
            gridRowBoxes[i] + 1

        }
    }
}


// * Remove letter from screen and inputtedWordArray

const removeLetterFromGrid = () => {
    let lastBox = gridRowBoxes[inputtedWordArray.length - 1]
    lastBox.textContent = ''
    lastBox.classList.remove('text-within')
    inputtedWordArray.pop()
}

// * Reset 

const reset = () => {
    setTimeout(()=> {
        inputtedWordArray = []
        if (gridIndex <5) {
            gridIndex++
            gridRowBoxes = document.querySelector(`[data-index="${gridIndex}"]`).getElementsByClassName('box')
            disabled = false;
        } else {
        lostGame(wordleWord)
        }
    }, 1900)
}

// * Lost screen 

const lostGame = (word) => {
    const lostContainer = document.querySelector('.lost-container');
    const lostGrid = document.querySelector('.lost-grid-row').querySelectorAll('.box');
    const lostText = document.querySelector('.lost-text');
    const lostWord = document.querySelector('.word');

    lostContainer.classList.add('opacity')
    background.classList.add('background-color')

    lostGrid.forEach((id, index) => {
        setTimeout(()=>{
        lostGrid[index].classList.add('flip')
    }, index * 350)

    lostWord.textContent = word
    lostText.classList.remove('hidden')
    })
}

// * Won screen 

const wonGame = () => {
    const wonGrid = document.querySelector('.won-grid-row').querySelectorAll('.box');
    const wonContainer = document.querySelector('.won-container')
    const wonText = document.querySelector('.won-text');

    wonContainer.classList.add('opacity')
    background.classList.add('background-color')

    wonGrid.forEach((id, index) => {
        setTimeout(()=>{
        wonGrid[index].classList.add('flip')
    }, index * 350)

})
wonText.classList.remove('hidden')
}

getWordFromApi()
