// Game variables
var canvas = document.getElementById("gameCanvas");
var retryButton = document.getElementById("retryButton");
var startButton = document.getElementById("startButton"); // Add a start button
var highestScoreLabel = document.getElementById("highestScore"); // Add a label for highest score
var ctx = canvas.getContext("2d");
var birdX = 50;
var birdY = canvas.height / 2;
var birdSpeedY = 0;
var gravity = 0.125;
var jumpForce = 4;
var obstacles = [];
var obstacleWidth = 50;
var minGapHeight = 125;
var maxGapHeight = 200;
var obstacleSpeedX = 2;
var score = 0;
var highestScore = localStorage.getItem("highestScore") || 0; // Retrieve highest score from local storage

// Set initial display
retryButton.style.display = "none";
startButton.style.display = "block";
highestScoreLabel.textContent = "Highest Score: " + highestScore; // Display highest score

// Start button event listener
// Keyboard event listeners
document.addEventListener("keydown", jump);

// Use mousedown event for jumping on mouse click
document.addEventListener("mousedown", jump);
startButton.addEventListener("click", startGame);

retryButton.addEventListener("click", restartGame);

function startGame() {
  // Reset game variables
  isGameOver = false;
  birdY = canvas.height / 2;
  birdSpeedY = 0;
  score = 0;
  obstacles = [];
  retryButton.style.display = "none";
  startButton.style.display = "none";
  highestScoreLabel.style.display = "none";

  // Start the game loop
  gameLoop();
}

// Update game objects
function update() {
  if (!isGameOver) {
    // Move the bird
    birdSpeedY += gravity;
    birdY += birdSpeedY;

    // Move and generate obstacles
    for (var i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].x -= obstacleSpeedX;

      // Check collision with the obstacle
      if (
        birdX + 40 > obstacles[i].x &&
        birdX < obstacles[i].x + obstacleWidth &&
        (birdY < obstacles[i].topHeight ||
          birdY + 30 > obstacles[i].topHeight + obstacles[i].gapHeight)
      ) {
        gameOver();
        return;
      }

      // Increase score if bird passes the obstacle
      if (birdX > obstacles[i].x + obstacleWidth && !obstacles[i].scored) {
        obstacles[i].scored = true;
        score++;
      }

      // Remove obstacles that are off-screen
      if (obstacles[i].x + obstacleWidth < 0) {
        obstacles.splice(i, 1);
      }
    }

    // Generate new obstacles
    if (
      obstacles.length === 0 ||
      obstacles[obstacles.length - 1].x <
        canvas.width - Math.floor(Math.random() * (300 - 200 + 1) + 250)
    ) {
      var gapHeight = Math.floor(
        Math.random() * (maxGapHeight - minGapHeight + 1) + minGapHeight
      );
      var topHeight = Math.floor(Math.random() * (canvas.height - gapHeight));
      var bottomY = topHeight + gapHeight;
      obstacles.push({
        x: canvas.width,
        topHeight: topHeight,
        gapHeight: gapHeight,
        bottomY: bottomY,
        scored: false,
      });
    }

    // Game over if bird touches the ground or goes off-screen
    if (birdY + 30 > canvas.height || birdY < 0) {
      gameOver();
    }
  }
}

// Render game objects
function render() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the bird body
  ctx.fillStyle = "yellow";
  ctx.fillRect(birdX, birdY, 40, 30);

  // Draw the bird beak (triangle)
  ctx.beginPath();
  ctx.moveTo(birdX + 40, birdY + 15); // Right top corner of the bird body
  ctx.lineTo(birdX + 55, birdY + 22.5); // Tip of the beak (centered)
  ctx.lineTo(birdX + 40, birdY + 30); // Right bottom corner of the bird body
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.closePath();

  // Draw the bird eyes
  ctx.fillStyle = "white";
  ctx.fillRect(birdX + 28, birdY + 6, 9, 9); // Right eye (white)

  ctx.fillStyle = "black";
  ctx.fillRect(birdX + 32, birdY + 10, 3, 3); // Right eye (black)

  // Draw the obstacles with border effect
  for (var i = 0; i < obstacles.length; i++) {
    // Draw top rectangle of the obstacle
    ctx.fillStyle = "green";
    ctx.fillRect(obstacles[i].x, 0, obstacleWidth, obstacles[i].topHeight);

    // Draw bottom rectangle of the obstacle
    ctx.fillRect(
      obstacles[i].x,
      obstacles[i].topHeight + obstacles[i].gapHeight,
      obstacleWidth,
      canvas.height - obstacles[i].topHeight - obstacles[i].gapHeight
    );

    // Draw border effect for the top rectangle
    ctx.fillStyle = "darkgreen"; // You can set the color of the border
    ctx.fillRect(
      obstacles[i].x - 3, // Adjust the x-coordinate for the border
      obstacles[i].topHeight - 3, // Adjust the y-coordinate for the border
      obstacleWidth + 6, // Adjust the width for the border
      7 // Adjust the height for the border
    );

    // Draw border effect for the bottom rectangle
    ctx.fillRect(
      obstacles[i].x - 3, // Adjust the x-coordinate for the border
      obstacles[i].topHeight + obstacles[i].gapHeight, // Adjust the y-coordinate for the border
      obstacleWidth + 6, // Adjust the width for the border
      7 // Adjust the height for the border
    );
  }

  // Draw the score
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  // Game over text
  if (isGameOver) {
    ctx.fillStyle = "red";
    ctx.font = "36px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
    retryButton.style.display = "block";
    startButton.style.display = "none";

    // Update highest score
    if (score > highestScore) {
      highestScore = score;
      localStorage.setItem("highestScore", highestScore);
    }

    highestScoreLabel.textContent = "Highest Score: " + highestScore;
    highestScoreLabel.style.display = "block";
  } else {
    retryButton.style.display = "none";
  }
}

// Game loop
function gameLoop() {
  update();
  render();

  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }
}

// Handle jump event
function jump(event) {
  // Check if the space key is pressed or the mouse is clicked
  if (event.key === " " || event.type === "mousedown") {
    birdSpeedY = -jumpForce;
  }
}

// Game over logic
function gameOver() {
  isGameOver = true;
  retryButton.style.display = "block";
}

// Restart the game
function restartGame() {
  startButton.style.display = "block";
  highestScoreLabel.style.display = "block";
  retryButton.style.display = "none";
}
