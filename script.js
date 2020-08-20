const cards = document.querySelectorAll('.memory-card');
let hasFlippeCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippeCard) {
        hasFlippeCard = true;
        firstCard = this;
        return;
    } 
        hasFlippeCard = false; 
        secondCard = this;
        checkForMatch();
 }

function checkForMatch() {
    let isMath = firstCard.dataset.framework === secondCard.dataset.framework;
    isMath? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListenner('click', flipCard);
    secondCard.removeEventListenner('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    }, 1500);
}

function resetBoard() {
    hasFlippeCard = false;
    lockBoard = false;
    firstCard = null; 
    secondCard = null;
}

(function shuffle() {
    cards.forEach(card => {
       let randomPos = Math.floor(Math.random() * 12);
       card.style.order = randomPos;
   });
})();

cards.forEach(card => card .addEventListener('click' , flipCard));