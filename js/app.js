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

        this.inputBox.focus()

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
            },
            {
                word: 'forgot',
                hint: 'wait what was i talking about again?'
            },
            {
                word: 'spokesperson',
                hint: 'something that your mom is when you go to the doctors office'
            },
            {
                word: 'horseshoe',
                hint: 'horses wear this with their calm luh fit'
            },
            {
                word: 'absent',
                hint: 'your father falls under this adjective'
            },
            {
                word: 'convict',
                hint: 'do NOT call Al Capone this'
            }
        ];

        // (forgot number but we still up) set score property?
        this.score = {
            currScore: 0
        }

        // 3. Initialize the game (not sure if the positioning of this matters too much)
        this.init();
        // 4. Add event listener for the my buttons (not sure why they only work in the constructor but it makes sense in a way)
        this.newWordButton.addEventListener('click', ()=> {
            this.shuffle();
            this.clear();
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
    }

    // initalizer 
    init() {
        this.shuffle()
        this.check()
        // this.clock()
        this.restartGame()
        // this.shuffleTimer()
        // this.correct()
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
    

    // simple method for displaying socre!!!! (order is getting out of hand but we ball)
    scoreKeep() {
        const scoreDisplay = document.querySelector('.score')

        scoreDisplay.innerText = this.score.currScore
    }


    // 5. method to shuffle the characters of a word into a random order
    shuffle() {
        let wordObj = this.words[Math.floor(Math.random() * this.words.length)]; // gets random object from words
        let wordArr = wordObj.word.split(""); // Split the word into an array of characters

        this.correctWord = wordObj.word
        console.log(this.correctWord, wordObj.word);

        // Shuffle the characters of the word array (wordArr)
        for (let i = wordArr.length - 1; i > 0; i--) {
            let p = Math.floor(Math.random() * (i + 1));
            [wordArr[i], wordArr[p]] = [wordArr[p], wordArr[i]];
        }

        this.wordText.innerText = wordArr.join(''); // Display the scrambled word (thanks stack overflow and geek4geeks)
        this.hintText.innerText = wordObj.hint; // Display the hint
    }


    //(no longer needed)
    // shuffleTimer() {
    //     setInterval(this.shuffle(), 3000)
    // }

    // method for correct word that i apparently do not need
    // correct() {
    //     let wordObj = this.words[Math.floor(Math.random() * this.words.length)];
    //     let correctWrd;

    //     correctWrd = wordObj // random word = correct word
    //     console.log(correctWrd);

    // }

    // 6. method for checking if the typed answer matches word array
    check() {
        let answerBox = this.inputBox.value.toLowerCase()
        // let correctWord = this.correct()
        // let answer = this.wordText.innerText.toLowerCase().trim(); // useless code left as a reminder of failure

        if (answerBox.trim() === '') {
            return  // if anything text is entered do nothing
        }


        // console.log(answerBox);
        if (answerBox !== this.correctWord) {
            this.message.innerText = `${answerBox} is obviously not the answer`
            this.inputBox.value = ''
        } else {
            this.message.innerText = `I'm suprised you know that word`
            this.shuffle()
            this.inputBox.value = ''
            this.inputBox.focus()
            this.score.currScore+= 1
            this.scoreKeep()
        }
    }

    // 7. method to clear screen (for new word button) // use in new level later on
    clear() {
        this.inputBox.value = ''
        this.message.innerText = ''
    }

    clock() {
        let timeLeft = 5
        let timerId = setInterval(countdown, 1000);

        function countdown() {  
            console.log(timeLeft, game.timer);
            if (timeLeft == 0) {
                clearTimeout(timerId)
                game.gameOver()
            } else  {
                timeLeft--
                game.timer.innerText = timeLeft;
            }
        }
    }

    //(may no longer be needed)
    // resetClock() {
    //     // clearTimeout(this.timerId)
    //     clearInterval(this.timerId)
    //     // this.timer.innerText = ''
    //     this.clock()

        
    // }

    gameOver() {
        this.overlay.classList.remove('d-none')
        this.overlay.classList.add('d-block')
        this.contentHold.classList.add('d-none')
        // this.overlayText.innerText = 'Games over! Time to pick up a book or two'
    }

    restartGame() {
        this.restart.addEventListener('click', ()=> {
            this.overlay.classList.add('d-none')
            this.overlay.classList.remove('d-block')
            this.contentHold.classList.remove('d-none')
            this.contentHold.classList.add('d-block')
        })
    }

    
}



// Instantiate the WordScrambleGame class
const game = new WordScrambleGame();
