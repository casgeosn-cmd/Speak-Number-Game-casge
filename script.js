//// SPEAK NUMBER SECTION

const msgEl = document.getElementById('msg');

// generate random number between 1 and 100
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();
console.log(randomNum);

window.SpeechRecognition = 
window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new window.SpeechRecognition();
// start recognition and game
recognition.start();

// capture user speech

function onSpeak(event) {
    console.log(event);
    const msg = event.results[0][0].transcript;
    console.log(msg);
    writeMessage(msg);
    checkNumber(msg);
}

// listen to and handle the speech event 

recognition.addEventListener('result', onSpeak);

// See in the DOM what the user has spoken
function writeMessage(msg) {
    const div = document.createElement('div');
    div.textContent = 'You said: ';
    const span = document.createElement('span');
    span.classList.add('box');
    span.textContent = msg;
    msgEl.appendChild(div, span);

}

// check msg against secret number
function checkNumber(msg) {
    let num = Number(msg); // This is now a let instead of const 
    //update the value of num if it's a single-digit number
    if (msg === 'one' || msg === 'won') {
        num = 1;
    } else if (msg === 'two') {
        num = 2;
    } else if (msg === 'three') {
        num = 3;
    } else if (msg === 'four') {
        num = 4;
    } else if (msg === 'five') {
        num = 5;
    } else if (msg === 'six') {
        num = 6;
    } else if (msg === 'seven') {
        num = 7;
    } else if (msg === 'eight') {
        num = 8;
    } else if (msg === 'nine') {
        num = 9;
  }

  } // convert to number after adjustments
 
    // check if msg is a valid number


    if (Number.isNaN(num)) {
        const div = document.createElement('div');
        div.textContent = 'That is not a valid number';
        msgEl.innerHTML = '';
        msgEl.appendChild(div);
        
    }
// edge cases
    if (msg === 'one' || msg === 'won') {
        console.log('adjusting to 1')
        msg = 1;

    }


    // check if number is in range
    if (num < 1 || num > 100) {const div = document.createElement('div');
        div.textContent = 'Number must be between 1 and 100';
        msgEl.appendChild(div);
        
    }

    // check number and provide feedback 
    if (num === randomNum) {
       
        const h2 = document.createElement('h2');
        h2.textContent = `Congrats! You have guessed the number! It waws ${num}`;

        const button = document.createElement('button');
        button.classList.add('play-again');
        button.id = 'play-again';
        button.textContent = 'Play Again';
       
        /// add listener and handler to button 
        button.addEventListener('click', () => window.location.reload());
        
        // clear out innerHTML of msgEl
        msgEl.innerHTML = '';
        msgEl.append(h2, button);

    }

    else if (num > randomNum) {
        const div = document.createElement('div');
        div.textContent = 'GO LOWER';
        
        msgEl.innerHTML = '';
        msgEl.appendChild(div);
        
    } else {
        const div = document.createElement('div');
        div.textContent = 'GO HIGHER';

        msgEl.innerHTML = '';
        msgEl.appendChild(div);

    }





///// TYPE GAME SECTION
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I never make exceptions. An exception disproves the rule.',
    'You see, but you do not observe. The distinction is clear.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// store list of words and index of current words
let words = [];
let wordIndex = 0;
 // starting time 
 const quoteElement = document.getElementById('quote');
 const messageElement = document.getElementById('message');
 const typedValueElement = document.getElementById('typed-value');
 
 document.getElementById('start').addEventListener('click', () => {
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];

    // put quote into array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;

    //UI updates
    // create an array of span elements so we can set a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    // convert into string 
    quoteElement.innerHTML = spanWords.join('');
    // highlight the first word
    quoteElement.childNodes[0].className = 'highlight';

    // clear any prior messages
    messageElement.innerText = '';
    // setup the textbox
    //clear the textbox
    typedValueElement.value = '';
    //set focus
    typedValueElement.focus();
    // set event handler
    //start timer

    startTime = new Date().getTime();
 });

 typedValueElement.addEventListener('input', () => {
    // get current word
    const currentWord = words[wordIndex];
    // get current value
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        // end of quote
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGRATS! You finished in ${elapsedTime / 1000} seconds.`;
        messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        // end of word
        // clear the typedValueElement for the new word
        typedValueElement.value = '';
        // move to the next word
        wordIndex++;
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }

        // highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if 
    (currentWord.StartsWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
    } else {
        typedValueElement.className='error'
    }
 });

