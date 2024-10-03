const gameContainer = document.querySelector(".game-container");
const snake = document.getElementById("snake");
const food = document.getElementById("food");
const scoreDisplay = document.getElementById("score");
const hiscoreDisplay = document.getElementById("highscore");
const tailContainer = document.querySelector(".tail-container");
let snakeX = 0;
let snakeY = 0;
let foodX, foodY;
let score = 0;
let hiscore = 0;
let direction = "right";
let speed = 75;
let tail = [];
let gameStarting = false;

var root = document.querySelector(":root");

function randomPosition() {
  return Math.floor(Math.random() * 15) * 20;
}

function placeFood() {
  foodX = randomPosition();
  foodY = randomPosition();
  food.style.left = foodX + "px";
  food.style.top = foodY + "px";
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function updateHiScore() {
  hiscoreDisplay.textContent = `Hi-Score: ${hiscore}`;
}

function gameOver() {
  root.style.setProperty("--dim-visibility", "visible");
  root.style.setProperty("--blur-amount", "2px");
  document.querySelector(".gameover-score").textContent =
    "Your Score: " + score;
}

placeFood();
updateScore();
updateHiScore();

document.addEventListener("keydown", (event) => {
  if ((event.key === "w" || event.key === "W") && direction !== "down") {
    direction = "up";
  } else if ((event.key === "s" || event.key === "S") && direction !== "up") {
    direction = "down";
  } else if (
    (event.key === "a" || event.key === "A") &&
    direction !== "right"
  ) {
    direction = "left";
  } else if ((event.key === "d" || event.key === "D") && direction !== "left") {
    direction = "right";
  }
});

function onClickMove(move) {
  if (move == 1 && direction !== "down") {
    direction = "up";
  } else if (move == 2 && direction !== "up") {
    direction = "down";
  } else if (move == 3 && direction !== "right") {
    direction = "left";
  } else if (move == 4 && direction !== "left") {
    direction = "right";
  }
}

function gameLoop() {
  tail.push({ x: snakeX, y: snakeY });

  if (tail.length > score) {
    tail.shift();
  }

  if (direction === "up") {
    snakeY -= 20;
  } else if (direction === "down") {
    snakeY += 20;
  } else if (direction === "left") {
    snakeX -= 20;
  } else if (direction === "right") {
    snakeX += 20;
  }

  if (snakeX === foodX && snakeY === foodY) {
    score++;
    updateScore();
    if (score > hiscore) {
      hiscore++;
      updateHiScore();
    }
    placeFood();
  }

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= 300 ||
    snakeY >= 300 ||
    checkCollision()
  ) {
    gameOver();
    return;
  }

  tailContainer.innerHTML = "";
  for (let i = 0; i < tail.length; i++) {
    const tailSegment = document.createElement("div");
    tailSegment.className = "tail";
    tailSegment.style.left = tail[i].x + "px";
    tailSegment.style.top = tail[i].y + "px";
    tailContainer.appendChild(tailSegment);
  }

  snake.style.left = snakeX + "px";
  snake.style.top = snakeY + "px";

  setTimeout(gameLoop, speed);
}

function checkCollision() {
  for (let i = 0; i < tail.length; i++) {
    if (snakeX === tail[i].x && snakeY === tail[i].y) {
      return true;
    }
  }
  return false;
}

function gameIntStart() {
  if (gameStarting == false) {
    gameStart();
  } else {
    return;
  }
}

function gameStart() {
  gameStarting = true;
  document.querySelector(".start-btn").textContent = "SNAKE\r\nGAME";
  root.style.setProperty("--dim-visibility", "hidden");
  root.style.setProperty("--blur-amount", "0");
  snakeX = 0;
  snakeY = 0;
  foodX, foodY;
  score = 0;
  direction = "right";
  speed = 100;
  tail = [];
  updateScore();
  gameLoop();
}
