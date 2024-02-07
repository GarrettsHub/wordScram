



const wordText = document.querySelector('.scram-word')
const hintText = document.querySelector('.hintSpan')
const timeText = document.querySelector('.time')
const textBox = document.getElementById('wordInput')
const newWord = document.getElementById('newWrdBtn')
const checkBtn = document.getElementById('checkBtn')

const words = [
    {
        word: 'family',
        hint: 'Dom Torettos most prized possesion'
    },
    {
        word: 'countryside',
        hint: 'a place with no skyrise buildings. Just hard work and mean cows'
    },
    {
        word: 'money',
        hint: 'newtons first law of motion says you need some of this'
    },
    {
        word: 'coding',
        hint: 'what was done to make this game!'
    }
]

const init = () => {
    let wordObj = words[Math.floor(Math.random() * words.length)] // should get random word and hint
    let wordArr = wordObj.word.split("") // split words into indiviual letters //learn more about split method
    for (let i = wordArr.length - 1; i > 0; i--) {
        let p = Math.floor(Math.random() * (i + 1)); // pull random number //
        // shuffle words array at random?
        [ wordArr[i], wordArr[p]] = [ wordArr[p], wordArr[i]] 
    }

    // create p element
    const scramWord = document.createElement('p')
    scramWord.classList.add('scram-word', 'text-align-center', 'text-uppercase')
    scramWord.setAttribute('id', 'scramWord')

    scramWord.innerText = wordArr // pass word array through 
    const wordDiv = document.getElementById('wordDiv')
    wordDiv.appendChild(scramWord)

    // create hint 
    const hintCrea = document.createElement('p')
    hintCrea.classList.add('hint')
    hintCrea.setAttribute('id', 'hint')

    hintText.innerText = wordObj.hint // pass hint array through
    // const hint = `<p class="hint" Hint: <span> ${hintText} </span> </p>`
    const hintDiv = document.getElementById('hintDiv')
    hintDiv.appendChild(hintCrea)
    console.log(wordArr, wordObj.word)
}

init()

newWord.addEventListener('click',init)