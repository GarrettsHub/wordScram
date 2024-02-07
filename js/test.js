class WordScrambleGame {
    constructor() {
        // 1. Select DOM elements
        this.wordText = document.querySelector('.scram-word'); // Selects the element with class 'scram-word'
        this.hintText = document.querySelector('.hintSpan'); // Selects the element with class 'hintSpan'
        this.newWordButton = document.getElementById('newWrdBtn'); // Selects the button with id 'newWrdBtn'

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
        this.newWordButton.addEventListener('click', this.init.bind(this));
    }

    init() {
        // 4. Select a random word from the array and its hint
        let wordObj = this.words[Math.floor(Math.random() * this.words.length)];
        let wordArr = wordObj.word.split(""); // Split the word into an array of characters

        // Shuffle the characters of the word array
        for (let i = wordArr.length - 1; i > 0; i--) {
            let p = Math.floor(Math.random() * (i + 1));
            [wordArr[i], wordArr[p]] = [wordArr[p], wordArr[i]];
        }

        // Update the UI to display the scrambled word and its corresponding hint
        this.wordText.innerText = wordArr.join(''); // Display the scrambled word
        this.hintText.innerText = wordObj.hint; // Display the hint
    }
}

// Instantiate the WordScrambleGame class
const game = new WordScrambleGame();
