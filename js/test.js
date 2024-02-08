class WordScrambleGame {
    constructor() {
        // Select elements
        this.wordText = document.querySelector('.scram-word'); 
        this.hintText = document.querySelector('.hintSpan');
        this.newWordButton = document.getElementById('newWrdBtn'); 
        this.checkButton = document.getElementById('checkBtn')
        this.inputBox = document.getElementById('wordInput');
        this.messageBox = document.getElementById('messageBox');

        // Define array of words and hints
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

        // Initialize the game
        this.init();

        // Add event listeners
        this.newWordButton.addEventListener('click', () => {
            this.shuffle();
        });

        this.checkButton.addEventListener('click', () => {
            this.check();
        });
    }

    init() {
        this.shuffle(); // Shuffle the word and initialize the correct word
    }

    // Method to shuffle the characters of a word into a random order
    shuffle() {
        // Select a random word object
        let wordObj = this.words[Math.floor(Math.random() * this.words.length)];
        // Store the correct word separately
        this.correctWord = wordObj.word;
        
        // Shuffle the characters of the word array
        let wordArr = wordObj.word.split("");
        for (let i = wordArr.length - 1; i > 0; i--) {
            let p = Math.floor(Math.random() * (i + 1));
            [wordArr[i], wordArr[p]] = [wordArr[p], wordArr[i]];
        }

        // Display the shuffled word
        this.wordText.innerText = wordArr.join('');
        // Display the hint
        this.hintText.innerText = wordObj.hint;
    }

    // Method for checking if the typed answer matches the correct word
    check() {
        let answerBox = this.inputBox.value.toLowerCase().trim(); // Convert the input to lowercase for case-insensitive comparison
        
        if (answerBox === '') {
            // If the input box is empty, do nothing
            return;
        }

        if (answerBox !== this.correctWord) {
            this.messageBox.innerText = `${answerBox} is obviously not the answer`;
        } else {
            this.messageBox.innerText = `I'm surprised you know that word`;
        }
    }
}

// Instantiate the WordScrambleGame class
const game = new WordScrambleGame();
