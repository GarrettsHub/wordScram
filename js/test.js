User
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
                points: 2
            },
            {
                word: 'sister',
                hint: 'a born loser (you know who you are)',
                points: 2
            }
        ];

        // (forgot number but we still up) set score property?
        this.score = 0,

        // 3. Initialize the game (not sure if the positioning of this matters too much)
        this.init();
        // 4. Add event listener for the my buttons 
        this.newWordButton.addEventListener('click', ()=> {
            this.shuffle();
            this.clear();
            this.scoreClear()
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
        this.scoreDisplay.innerText = this.score.currScore
        
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

        this.correctWord = wordObj.word
        console.log(this.words);

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
        let currWord = this.words.find(wordObj => wordObj.word === this.word)

        if (!currWord) {
            console.log('error you may be cooked lil bro');
            return;
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
            this.score += this.wordPoints()
            this.update()
            this.scoreKeep()
        }
    }

    wordPoints() {
        // getting the currently displayed word object
        let wordProp = this.words.find(wordObj => wordObj.word === this.word)
        // return points associated with word
        return wordProp.points || 0
    }

    update() {
        this.scoreDisplay.innerText = this.score
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
            this.clear()
            this.shuffle()
            this.scoreClear()
        })
    }

    
}



// Instantiate the WordScrambleGame class
const game = new WordScrambleGame();



class WordScrambleGame {
    constructor() {
        // Other constructor code...

        // Boolean flag to track if the correct word has been guessed
        this.correctAnswer = false;
    }

    // Other methods...

    check() {
        let answerBox = this.inputBox.value.toLowerCase();

        if (answerBox.trim() === '') {
            return;  // If anything is entered, do nothing
        }

        // If the correct word has already been guessed, do nothing
        if (this.correctAnswer) {
            return;
        }

        let wordObj = this.words.find(word => word.word === this.correctWord); // Find the word object from the array
        this.points = wordObj.points; // Assign points associated with the current word

        if (answerBox !== this.correctWord) {
            this.message.innerText = `${answerBox} is obviously not the answer`;
            this.inputBox.value = '';
        } else {
            this.message.innerText = `I'm surprised you know that word`;
            this.shuffle();
            this.inputBox.value = '';
            this.inputBox.focus();
            this.score.currScore += this.points; // Add points associated with the current word
            this.scoreKeep(); // Update the displayed score
            this.correctAnswer = true; // Set the flag to true since the correct word has been guessed
        }
    }
}

check() {
    let answerBox = this.inputBox.value.toLowerCase();

    if (answerBox.trim() === '') {
        return; // If no text is entered, do nothing
    }

    if (answerBox !== this.correctWord) {
        this.message.innerText = `${answerBox} is obviously not the answer`;
        this.inputBox.value = '';
    } else {
        if (!this.correctAnswer) {
            // Update the score only if the correct word hasn't been typed before
            this.score.currScore += this.points;
            this.scoreKeep();
            this.correctAnswer = true; // Set the flag to true indicating the correct word has been typed
        }
        this.message.innerText = `I'm surprised you know that word`;
        this.shuffle(); // Display a new word
        this.inputBox.value = '';
        this.inputBox.focus();
    }
}


check() {
    let answerBox = this.inputBox.value.toLowerCase().trim();

    if (answerBox === this.correctWord) {
        // Find the current word object and get its points
        let currentWordObj = this.words.find(wordObj => wordObj.word === this.correctWord);
        let points = currentWordObj.points || 0;

        // Update the score and display
        this.score.currScore += points;
        this.scoreKeep();

        // Display message and shuffle for the next word
        this.message.innerText = `You got it! ${points} points added.`;
        this.shuffle();
        this.inputBox.value = '';
        this.inputBox.focus();
    } else {
        this.message.innerText = `${answerBox} is not the correct word. Try again.`;
    }
}


  // Find the current word object and get its points
  let currentWordObj = this.words.find(wordObj => wordObj.word === this.correctWord);
  let points = currentWordObj.points || 0

  // Update the score and display
  this.score.currScore += points
  this.scoreKeep();
  // Display message and shuffle for the next word
  this.message.innerText = `I'm surprised you know that word`
  this.shuffle();
  this.inputBox.value = ''
  this.inputBox.focus()


            let currentWordObj = this.words.find(wordObj => wordObj.word === this.correctWord);
            let points = currentWordObj.points || 0
            this.correctAnswer = true
            // Update the score and display
            this.score.currScore += points
            this.scoreKeep();
            // Display message and shuffle for the next word
            this.message.innerText = `I'm surprised you know that word`
            this.shuffle();
            this.inputBox.value = ''
            this.inputBox.focus()