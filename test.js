// let gridIndex = 0;
// const gridRowBoxes = document.querySelector(`[data-index="${gridIndex}"]`).getElementsByClassName('box')
// const click = document.querySelector('#enter').addEventListener('click', () => {
//     gridIndex++
//     test()
// })

// console.log(gridRowBoxes.textContent = 'hello')


// const test = () => {
//     const addIndex = gridIndex + 1;
//     const active = document.querySelector(`[data-index="${gridIndex}"]`)

    
//     console.log(active)
// }



// const boxCycle = (keypress) => {
//     for(let i = 0; wordArr.length < 5 ; i++) {
//         if (gridRowBoxes[i].classList.contains('text-within') === false){
//             gridRowBoxes[i].textContent = keypress
//             gridRowBoxes[i].classList.add('text-within')
//             wordArr.push(keypress)
//             break
//         } else {
//             gridRowBoxes[i] + 1

//         }
//     }
// }

// test()

const qKey = document.querySelector('#q-key')
const wKey = document.querySelector('#w-key');
const eKey = document.querySelector('#e-key');
const rKey = document.querySelector('#r-key');
const tKey = document.querySelector('#t-key');
const yKey = document.querySelector('#y-key');
const uKey = document.querySelector('#u-key');
const iKey = document.querySelector('#i-key');
const oKey = document.querySelector('#o-key');
const pKey = document.querySelector('#p-key');
const aKey = document.querySelector('#a-key');
const sKey = document.querySelector('#s-key');
const dKey = document.querySelector('#d-key');
const fKey = document.querySelector('#f-key');
const gKey = document.querySelector('#g-key');
const hKey = document.querySelector('#h-key');
const jKey = document.querySelector('#j-key');
const kKey = document.querySelector('#k-key');
const lKey = document.querySelector('#l-key');
const zKey = document.querySelector('#z-key');
const xKey = document.querySelector('#x-key');
const cKey = document.querySelector('#c-key');
const vKey = document.querySelector('#v-key');
const bKey = document.querySelector('#b-key');
const nKey = document.querySelector('#n-key');
const mKey = document.querySelector('#m-key');
const backspace = document.querySelector('#backspace').addEventListener('click', () =>{removeLetter()})
const enter = document.querySelector('#enter').addEventListener('click', () => {
    checkInputtedWordInApi(wordArr.join(''))
});

const qwerty = document.querySelectorAll('.qwerty')

// alphabet array so only letters are entered into boxes. try to find a way to not have to type it out.
const alphabetArray = [aKey, bKey, cKey, dKey, eKey, fKey, gKey, hKey, iKey, jKey, kKey, lKey, mKey, nKey, oKey, pKey, qKey, rKey, sKey, tKey, uKey, vKey, wKey, xKey, yKey, zKey];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];



document.addEventListener('keydown', (e) => {
    if (alphabetArray.includes(e.key)) {
        console.log(e.key)
    } else 
    return 
})

qwerty.forEach(letter => {
    letter.addEventListener('click', () => {
        console.log(letter.textContent)
    })

})

