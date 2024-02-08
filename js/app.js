class WordScrambleGame {
    constructor() {
        // 1. Select DOM elements
        this.wordText = document.querySelector('.scram-word'); 
        this.hintText = document.querySelector('.hintSpan');
        this.newWordButton = document.getElementById('newWrdBtn'); 
        this.checkButton = document.getElementById('checkBtn')
        this.inputBox = document.getElementById('wordInput')
        this.message = document.getElementById('messageBox')


        // 2. Define array of words and hints
        this.words = [
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
        ];

        // 3. Initialize the game
        this.init();
        // 5. Add event listener for the "New Word" button
        this.newWordButton.addEventListener('click', ()=> {
            this.shuffle();
        });
        this.checkButton.addEventListener('click', ()=> {
            this.check()
        })
    }

    init() {
        this.shuffle()
        // this.correct()
        this.check()
        // 4. Select a random word from the array and its hint
        // let wordObj = this.words[Math.floor(Math.random() * this.words.length)];
        // let wordArr = wordObj.word.split(""); // Split the word into an array of characters

        // Shuffle the characters of the word array
        // for (let i = wordArr.length - 1; i > 0; i--) {
        //     let p = Math.floor(Math.random() * (i + 1));
        //     [wordArr[i], wordArr[p]] = [wordArr[p], wordArr[i]];
        // }

        // Update the UI to display the scrambled word and its corresponding hint
        // this.wordText.innerText = wordArr.join(''); // Display the scrambled word
        // this.hintText.innerText = wordObj.hint; // Display the hint
    }


    // method to shuffle the characters of a word into a random order
    shuffle() {
        let wordObj = this.words[Math.floor(Math.random() * this.words.length)]; // gets random object from words
        let wordArr = wordObj.word.split(""); // Split the word into an array of characters

        this.correctWord = wordObj.word

        // Shuffle the characters of the word array (wordArr)
        for (let i = wordArr.length - 1; i > 0; i--) {
            let p = Math.floor(Math.random() * (i + 1));
            [wordArr[i], wordArr[p]] = [wordArr[p], wordArr[i]];
        }

        this.wordText.innerText = wordArr.join(''); // Display the scrambled word
        this.hintText.innerText = wordObj.hint; // Display the hint
    }

    // method for correct word that i apparently do not need
    // correct() {
    //     let wordObj = this.words[Math.floor(Math.random() * this.words.length)];
    //     let correctWrd;

    //     correctWrd = wordObj // random word = correct word
    //     console.log(correctWrd);

    // }

    // method for checking if the typed answer matches word array
    check() {
        let answerBox = this.inputBox.value.toLowerCase()
        // let correctWord = this.correct()
        let answer = this.wordText.innerText.toLowerCase().trim(); // Get the word displayed on the screen and convert it to lowercase

        if (answerBox.trim() === '') {
            return  // if anything text is entered do nothing
        }


        // console.log(answerBox);
        if (answerBox !== this.correctWord) {
            this.message.innerText = `${answerBox} is obviously not the answer`
        } else {
            this.message.innerText = `I'm suprised you know that word`
        }
    }

    
}

// Instantiate the WordScrambleGame class
const game = new WordScrambleGame();
