let cards = document.querySelectorAll(".card");
let cardArray = [...cards];
let flippedCard = false;
let lockCard = false;
let firstCard, secondCard;
const clickSound = document.getElementById('clickSound');
const backgroundMusic = document.getElementById('backgroundMusic');

// Shuffle the cards
function shuffle() {
  cardArray.forEach((card) => {
    let randomIndex = Math.floor(Math.random() * cardArray.length);
    card.style.order = randomIndex;
    card.children[1].style.backgroundImage = `url(${card.getAttribute("data-image")})`;
  });
}

// Flip a card
function flipCard() {
  if (lockCard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  clickSound.play(); // Play sound on card click

  if (!flippedCard) {
    // First card flipped
    flippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Check for a match
function checkForMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

// Unflip non-matched cards
function unflipCards() {
  lockCard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

// Reset the game board
function resetBoard() {
  [flippedCard, lockCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Start the game
function startGame() {
  shuffle();
  cards.forEach((card) => card.addEventListener("click", flipCard));
  backgroundMusic.play(); // Play background music when the game starts
}

startGame();

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');
  const timerElement = document.getElementById('timer');
  const popup = document.querySelector('.popup');
  
  let totalSeconds = 60; // 1 minute
  let secondsLeft = totalSeconds;
  let timerInterval;

  // Start countdown timer
  function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
  }

  // Update timer display
  function updateTimer() {
    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      showPopup("You lose, try again");
    } else {
      secondsLeft--;
    }
  }

  // Function to show popup message
  function showPopup(message) {
    const popupMessage = document.createElement('div');
    popupMessage.classList.add('popup');
    popupMessage.innerHTML = `
      <h2>${message}</h2>
      <button onclick="restartGame()">Restart Game</button>
    `;
    document.body.appendChild(popupMessage);
  }

  // Function to restart the game
  function restartGame() {
    // Implement game reset logic here if needed
    location.reload(); // Reloads the page to restart the game
  }

  // Event listener to start timer when content is loaded
  document.addEventListener('DOMContentLoaded', startTimer);
});
