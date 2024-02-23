class WordScrambleGame {
    constructor() {
        // 1. Select DOM elements
        this.wordText = document.querySelector('.scram-word'); 
        this.hintText = document.querySelector('.hintSpan');
        this.newWordButton = document.getElementById('newWrdBtn'); 
        this.checkButton = document.getElementById('checkBtn')
        this.inputBox = document.getElementById('wordInput')
        this.message = document.getElementById('messageBox')
        this.timer = document.querySelector('.timer')
        this.overlay = document.getElementById('timeUp')
        this.overlayText = document.querySelector('.time-up-content')
        this.correctWord = ''
        this.contentHold = document.querySelector('.content')
        this.restart = document.querySelector('.restart-btn')
        this.scoreDisplay = document.querySelector('.score')
        this.hiScoreShow = document.querySelector('.hi-score')
        this.play = document.querySelector('.play-btn')
        this.startContain = document.getElementById('startGame')

        this.correctWord;
        this.points 
        this.correctAnswer = false


        this.inputBox.focus()

        // 2. Define array of words and hints
        this.words = [
            {
                word: 'family',
                hint: 'Dom Torettos most prized possesion',
                points: 2
            },
            {
                word: 'countryside',
                hint: 'a place with no skyrise buildings. Just hard work and mean cows',
                points: 5
            },
            {
                word: 'money',
                hint: 'newtons first law of motion says you need some of this',
                points: 1
            },
            {
                word: 'coding',
                hint: 'what was done to make this game!',
                points: 1
            },
            {
                word: 'forgot',
                hint: 'wait what was i talking about again?',
                points: 1
            },
            {
                word: 'spokesperson',
                hint: 'something that your mom is when you go to the doctors office',
                points: 7
            },
            {
                word: 'horseshoe',
                hint: 'horses wear this with their calm luh fit',
                points: 4
            },
            {
                word: 'absent',
                hint: 'your father falls under this adjective',
                points: 2
            },
            {
                word: 'convict',
                hint: 'do NOT call Al Capone this',
                points: 3
            },
            {
                word: 'sister',
                hint: 'a born loser (you know who you are)',
                points: 2
            },
            {
                word: 'attack',
                hint: 'you do this on titans',
                points: 3
            },
            {
                word: 'mole',
                hint: 'I cant tell if this is  a pimple or a...',
                point: 1
            },
        ];

        // (forgot number but we still up) set score property?
        this.score = {
            currScore: 0,
            hiScore: 0
        }

        // 3. Initialize the game (not sure if the positioning of this matters too much)
        this.init();
        // 4. Add event listener for the my buttons 
        this.play.addEventListener('click', ()=> {
            this.startContain.classList.add('d-none')
            this.contentHold.classList.remove('d-none')
            this.contentHold.classList.add('d-block')
            this.shuffle()
            this.clock()
            this.inputBox.focus()
        })
        this.newWordButton.addEventListener('click', ()=> {
            this.shuffle();
            this.clear();
            // this.scoreClear()
            // this.clock()
            // this.resetClock()
        });
        this.checkButton.addEventListener('click', ()=> {
            this.check()
            
        })
        this.inputBox.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault()
                document.getElementById('checkBtn').click()
            }
        })

        this.correctAnswer = false;
    }

    // initalizer 
    init() {
        this.shuffle()
        this.check()
        // this.clock()
        this.restartGame()
        // this.shuffleTimer()
        // this.correct()
    }
    

    // simple method for displaying socre!!!! (order is getting out of hand but we ball)
    scoreKeep() {
        this.scoreDisplay.innerText = this.score.currScore
        this.hiScoreShow.innerText = this.score.currScore
    }

    hiScore() {
        const hiScoreDisplay = document.querySelector('.hi-item')

        if (this.gameOver() && this.score.currScore > this.score.hiScore) {
            this.score.hiScore = this.score.currScore
        }
        hiScoreDisplay.innerText = this.score.hiScore
    }

    scoreClear() {
        this.score.currScore = 0
        this.scoreDisplay.innerText = this.score.currScore
    }

    // 5. method to shuffle the characters of a word into a random order
    shuffle() {
        let wordObj = this.words[Math.floor(Math.random() * this.words.length)]; // gets random object from words
        let wordArr = wordObj.word.split(""); // Split the word into an array of characters
        this.points = wordObj.points
        this.correctWord = wordObj.word

        // let index = this.words.splice(index, 1)

        console.log(this.points);

        // Shuffle the characters of the word array (wordArr)
        for (let i = wordArr.length - 1; i > 0; i--) {
            let p = Math.floor(Math.random() * (i + 1));
            [wordArr[i], wordArr[p]] = [wordArr[p], wordArr[i]];
        }

        this.wordText.innerText = wordArr.join(''); // Display the scrambled word (thanks stack overflow and geek4geeks)
        this.hintText.innerText = wordObj.hint; // Display the hint

        this.correctAnswer = false;
    }

    // 6. method for checking if the typed answer matches word array
    check() {
        let answerBox = this.inputBox.value.toLowerCase().trim();
    
        if (answerBox === '') {
            return; // If the answer box is empty, do nothing
        }
    
        if (answerBox !== this.correctWord) {
            this.message.innerText = `${answerBox} is obviously not the answer`;
            this.inputBox.value = '';
        } else {
            // this.words (array) find (search through array) wordObj (random word object from array) wordObj.word (random WORD from word object) which equals to this.correctWord (current wordObj)
            let currentWordObj = this.words.find(wordObj => wordObj.word === this.correctWord);
            // set points default to 0 and now accesses the random word objects points
            let points = currentWordObj.points || 0;
            this.correctAnswer = true;
            // Update the score and display
            this.score.currScore += points;
            this.scoreKeep();
            // Display message and shuffle for the next word
            this.message.innerText = `I'm surprised you know that word`;
            this.shuffle();
            this.inputBox.value = '';
            this.inputBox.focus();
        }
    }
    

    // 7. method to clear screen (for new word button) // use in new level later on
    clear() {
        this.inputBox.value = ''
        this.message.innerText = ''
    }

    clock() {
        let timeLeft = 30
        let timerId = setInterval(countdown, 1000);

        function countdown() {  
            // console.log(timeLeft, game.timer);
            if (timeLeft == 0) {
                clearTimeout(timerId)
                game.gameOver()
            } else  {
                timeLeft--
                game.timer.innerText = timeLeft;
            }
        }
    }

    gameOver() {
        this.overlay.classList.remove('d-none')
        this.overlay.classList.add('d-block')
        this.contentHold.classList.add('d-none')
        // this.overlayText.innerText = 'Games over! Time to pick up a book or two'
    }

    resetClock() {
        clearInterval(this.clock())
    }

    restartGame() {
        this.restart.addEventListener('click', ()=> {
            this.overlay.classList.add('d-none')
            this.overlay.classList.remove('d-block')
            this.contentHold.classList.remove('d-none')
            this.contentHold.classList.add('d-block')
            this.clear()
            this.shuffle()
            this.scoreClear()
            this.clock()
            this.inputBox.focus()
        })
    }

    
}

// initalize the WordScrambleGame class
const game = new WordScrambleGame();
