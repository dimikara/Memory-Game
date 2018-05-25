/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-github", "fa fa-github", "fa fa-slack", "fa fa-slack", "fa fa-codepen", "fa fa-codepen", "fa fa-at", "fa fa-at", "fa fa-google-plus", "fa fa-google-plus", "fa fa-dropbox", "fa fa-dropbox", "fa fa-html5", "fa fa-html5", "fa fa-usb", "fa fa-usb"];

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

/*
 * Initializing the game, by suffling & creating the list of cards 
 */
function init() {
    const icons2 = shuffle(icons);
    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);
    
        // Add Click Event to each Card
        click(card);
    }
}


/*
 * Click Event
 */

// First Click Indicator
let isFirstClick = true;

// Click Function
function click(card) {

    // Card Click Event
    card.addEventListener("click", function() {

        /*
        * At the first click, the condition will be true,
        * and our code below will get executed!
        * 
        * We will call our `startTimer` function,
        * Then, set the `isFirstClick` to `false`, so in the next click,
        * it will be `if(false)` and nothing will happen, as we don't have an `else`!
        * 
        * THAT'S EXACTLY what we want!
        */
        if(isFirstClick) {
            // Start our timer
            startTimer();
            // Change our First Click indicator's value
            isFirstClick = false;
        }
        
        const currentCard = this;
        const previousCard = openedCards[0];

        // We have an existing OPENED card
        if(openedCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openedCards.push(this);

            // We should compare our 2 opened cards!
            compare(currentCard, previousCard);

        } else {
        // We don't have any opened cards
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
        
    });
}


/*
 * Compare the 2 cards
 */
function compare(currentCard, previousCard) {

    // Matcher
    if(currentCard.innerHTML === previousCard.innerHTML) {
                
        // Matched
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        // Check if the game is over!
        isOver();

    } else {
        
        /* The two cards are turned with the face down, not immediately but after 500ms.
        *  I also tried 750ms, but in this case it was possible for the player to have three cards open
        *  at the same time if they clicked quickly.
        */
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");
        }, 500);

        openedCards = [];
        
    }

    // Add New Move
    addMove();
}

/*
 * Check if the game is over!
 */
function isOver() {
    if(matchedCards.length === icons.length) {

        // Stop our timer
        stopTimer();

        /*
         * Display your popup here, the `alert` is for explanation only!
         * 
         * In your popup, you should create a button, 
         * To let the user play a new game
         * 
         * After clicking on that button, you should:
         *  - Call the `init` function to re-create the cards
         *  - Call the `reset` function to reset all variables
         */
        alert("GAME OVER!");
        
    }
}


/*
 * Add move
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    // Set the rating
    rating();
}

/*
 * Rating
 */
const   starsContainer = document.querySelector(".stars"), 
        star = `<li><i class="fa fa-star"></i></li>`,
        starHalf = `<li><i class="fa fa-star-half-empty"></i></li>`,
        starWhite = `<li><i class="fa fa-star-o"></i></li>`;
let     ratingMeter

starsContainer.innerHTML = star + star + star;


function rating() {
    if( moves <= 10) {
        starsContainer.innerHTML = star + star + star;
        ratingMeter = star + star + star;
    } else if(moves > 10 && moves < 15) {
        starsContainer.innerHTML = star + star + starHalf;
        ratingMeter = star + star;
    } else if(moves === 15) {
        starsContainer.innerHTML = star + star + starWhite;
        ratingMeter = star + star;
    } else if(moves > 15 && moves < 20) {
        starsContainer.innerHTML = star + starHalf + starWhite;
        ratingMeter = star;
    } else {
        starsContainer.innerHTML = star + starWhite + starWhite;
        ratingMeter = star;
    }
}


/*
 * Timer
 */
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + 's';

/*
 * We call this function to start our function, 
 * the totalSeconds will be increased 
 * by 1 after 1000ms (1 second!)
 * 
 * HINT: We need to call this function ONCE, and the best time to call it
 * is when the user click on a card (The first card!)
 * This means that our user is start playing now! ;)
 */
 function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
}


/*
 * Our timer won't stop. To stop it, we should clearInterval!
 * We will call it when the game is over.
 * So, we will call it at the end of `isOver` function
 * 
 * HINT: That's why I created the `liveTimer` variable, 
 * to store the setInterval's function, so that we can stop it by its name!
 */
function stopTimer() {
    clearInterval(liveTimer);
}

/*
 * Restart Button
 */
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    // Delete ALL cards
    cardsContainer.innerHTML = "";

    // Call `init` to create new cards
    init();

    // Reset the game
    reset();

});


/*
 * Reset All Game Variables
 */
function reset() {
    // Empty the `matchedCards` array
    matchedCards = [];

    // Reset `moves`
    moves = 0;
    movesContainer.innerHTML = moves;

    // Reset `rating`
    starsContainer.innerHTML = star + star + star;

    /*
     * Reset the `timer`
     * 
     * - Stop it first
     * - Then, reset the `isFirstClick` to `true` to be able to start the timer again!
     * - Don't forget about `totalSeconds`, it must be `0`
     * - One more thing, is to update the HTML timer's container
     */
    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";
}


/////// Start the game for the first time!
init();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
