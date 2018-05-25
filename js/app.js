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
function click(card) {

    // Card Click Event
    card.addEventListener("click", function() {

        //start timer on first move
        if(moves == 1){
            second = 0;
            minute = 0; 
            hour = 0;
            startTimer();
        }
        
        const currentCard = this; 
        const previousCard = openedCards[0];

        // An existing OPENED card
        if(openedCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openedCards.push(this);

            // The two opened cards should be compared
            compare(currentCard, previousCard);

        } else {
        // There are no opened cards
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
        
    });
}


//game timer
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


/*
 * Compare two cards
 */
function compare(currentCard, previousCard) {

    // "Matcher"
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
 * ---->HERE GOES THE MODAL
 * Ideas: https://www.w3schools.com/howto/howto_css_modals.asp 
 */
function isOver() {
    if(icons.length === matchedCards.length) {
        alert('The game is over!');
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
    console.log(ratingMeter);
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

    // Reset ANY RELATED variables
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = star + star + star;
});


/////// Initialize the game
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
