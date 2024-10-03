// Get the canvas and its 2D rendering context
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

// Get HTML elements for displaying the word and available letters
const wordDisplay = document.getElementById("wordDisplay");
const letters = document.getElementById("letters");

// Array of words for the hangman game
const words = [
  // List of words related to programming and technology
  "javascript",
  "database",
  "framework",
  "frontend",
  "backend",
  "server",
  "cloud",
  "api",
  "authentication",
  "repository",
  "deployment",
  "domain",
  "middleware",
  "routing",
  "session",
  "encryption",
  "authentication",
  "authorization",
  "query",
  "http",
  "sql",
  "mongodb",
  "node",
  "react",
  "express",
  "mysql",
  "redux",
  "docker",
  "kubernetes",
  "loadbalancing",
  "middleware",
  "serverless",
  "microservices",
  "continuousintegration",
  "versioncontrol",
  "frontend",
  "backend",
  "authentication",
];

// Initialize variables for the current word and guessed letters
let word = "";
let guessedLetters = [];


function newGame() {
  // Remove any existing popups
  const existingPopups = document.querySelectorAll(".popup");
  existingPopups.forEach((popup) => popup.remove());

  // Start a new game
  word = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  drawHangman();
  updateWordDisplay();
  updateLetters();
}

// Function to draw the hangman based on the number of incorrect guesses
function drawHangman() {
  // Clear the entire canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set a horizontal offset for the entire hangman drawing
  const xOffset = 20;

  // Count the number of incorrect guesses by filtering letters not in the word
  const incorrectGuesses = guessedLetters.filter(
    (letter) => !word.includes(letter)
  ).length;

  // Draw the hangman step by step based on the number of incorrect guesses

  // Step 1: Draw the horizontal bar at the bottom
  if (incorrectGuesses >= 1) {
    ctx.beginPath();
    ctx.moveTo(20 + xOffset, 380);
    ctx.lineTo(120 + xOffset, 380);
    ctx.stroke();
  }

  // Step 2: Draw the vertical bar
  if (incorrectGuesses >= 2) {
    ctx.beginPath();
    ctx.moveTo(70 + xOffset, 380);
    ctx.lineTo(70 + xOffset, 100);
    ctx.stroke();
  }

  // Step 3: Draw the horizontal bar at the top
  if (incorrectGuesses >= 3) {
    ctx.beginPath();
    ctx.moveTo(50 + xOffset, 100);
    ctx.lineTo(170 + xOffset, 100);
    ctx.stroke();
  }

  // Step 4: Draw the head
  if (incorrectGuesses >= 4) {
    ctx.beginPath();
    ctx.arc(160 + xOffset, 120, 20, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Step 5: Draw the body
  if (incorrectGuesses >= 5) {
    ctx.beginPath();
    ctx.moveTo(160 + xOffset, 140);
    ctx.lineTo(160 + xOffset, 250);
    ctx.stroke();
  }

  // Step 6: Draw the left arm
  if (incorrectGuesses >= 6) {
    ctx.beginPath();
    ctx.moveTo(160 + xOffset, 180);
    ctx.lineTo(100 + xOffset, 200);
    ctx.stroke();
  }

  // Step 7: Draw the right arm
  if (incorrectGuesses >= 7) {
    ctx.beginPath();
    ctx.moveTo(160 + xOffset, 180);
    ctx.lineTo(220 + xOffset, 200);
    ctx.stroke();
  }

  // Step 8: Draw the left leg
  if (incorrectGuesses >= 8) {
    ctx.beginPath();
    ctx.moveTo(159 + xOffset, 248);
    ctx.lineTo(189 + xOffset, 288);
    ctx.stroke();
  }

  // Step 9: Draw the right leg
  if (incorrectGuesses >= 9) {
    ctx.beginPath();
    ctx.moveTo(140 + xOffset, 260);
    ctx.lineTo(170 + xOffset, 300);
    ctx.stroke();
  }
}

// Function to update the displayed word based on guessed letters
function updateWordDisplay() {
  // Map each letter of the word to either display the letter or an underscore
  const displayedWord = word
    .split("")
    .map((letter) =>
      guessedLetters.includes(letter) || letter === " " ? letter : "_"
    )
    .join(" "); // Add a space between each character

  // Update the content of the element displaying the word
  wordDisplay.textContent = displayedWord;

  // Check if the displayed word matches the original word (ignoring spaces)
  if (displayedWord.replace(/ /g, "") === word.replace(/ /g, "")) {
    // If all letters are guessed, show the win popup
    showWinPopup();
  }
}

// Function to show a win popup
function showWinPopup() {
  // Create a new div element for the win popup
  const winPopup = document.createElement("div");
  winPopup.className = "popup";

  // Set the HTML content of the win popup
  winPopup.innerHTML = `
    <div class="popup-content">
      <p>You win!</p>
      <button onclick="newGame()">New Game</button>
    </div>
  `;

  // Append the win popup to the body of the document
  document.body.appendChild(winPopup);
}

// Function to show a lose popup
function showLosePopup() {
  // Create a new div element for the lose popup
  const losePopup = document.createElement("div");
  losePopup.className = "popup";

  // Set the HTML content of the lose popup, including the correct word
  losePopup.innerHTML = `
    <div class="popup-content">
      <p>You lose! The word was "${word}"</p>
      <button onclick="newGame()">New Game</button>
    </div>
  `;

  // Append the lose popup to the body of the document
  document.body.appendChild(losePopup);
}


function updateLetters() {
  const letterButtons = "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => {
    return `<button class="letter-button" onclick="guessLetter('${letter}')" ${
      guessedLetters.includes(letter) ? "disabled" : ""
    }>${letter}</button>`;
  });
  letters.innerHTML = letterButtons.join("");
}

function guessLetter(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    updateWordDisplay();
    drawHangman();
    updateLetters();

    if (guessedLetters.filter((l) => !word.includes(l)).length >= 9) {
      showLosePopup();
    }
  }
}

document.addEventListener("keydown", function (event) {
  const pressedKey = event.key.toLowerCase();

  // Check if the pressed key is a valid letter
  if (/^[a-z]$/.test(pressedKey)) {
    // Call the guessLetter function with the pressed key
    guessLetter(pressedKey);
  }
});

newGame();

const audio = document.getElementById("backgroundMusic");

document.addEventListener("DOMContentLoaded", function () {
  // Code inside this function will run when the document is fully loaded
  playAudio(); // Start playing the audio when the document is loaded
});

function playAudio() {
  if (audio.paused) {
    audio.play();
    playButton.textContent = "⏸️";
  } else {
    audio.pause();
    playButton.textContent = "▶️";
  }
}

function toggleMute() {
  audio.muted = !audio.muted;

  if (audio.muted) {
    playButton.textContent = "▶️";
  } else {
    playButton.textContent = "⏸️";
  }
}

playButton.addEventListener("click", function () {
  if (audio.src) {
    // If audio source is set, toggle between play/pause
    playAudio();
  } else {
    // If audio source is not set, toggle between mute/unmute
    toggleMute();
  }
});

function showModal(message) {
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.textContent = message;
  document.body.appendChild(modalOverlay);

  // Close the modal after 2 seconds (adjust as needed)
  setTimeout(function () {
    modalOverlay.remove();
  }, 2000);
}
