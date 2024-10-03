let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissors";
  }
  return computerMove;
}

function play(playerMove) {
  if (playerMove !== "Reset") {
    const computerMove = pickComputerMove();
    let result = "";
    if (playerMove === "Scissors") {
      if (computerMove === "Scissors") {
        result = "Tie.";
      } else if (computerMove === "Rock") {
        result = "Lose.";
      } else {
        result = "Win.";
      }
    } else if (playerMove === "Paper") {
      if (computerMove === "Paper") {
        result = "Tie.";
      } else if (computerMove === "Scissors") {
        result = "Lose.";
      } else {
        result = "Win.";
      }
    } else if (playerMove === "Rock") {
      if (computerMove === "Rock") {
        result = "Tie.";
      } else if (computerMove === "Paper") {
        result = "Lose.";
      } else {
        result = "Win.";
      }
    }

    if (result !== "") {
      document.querySelector(".js-result").innerHTML = `You ${result}`;
      document.querySelector(
        ".js-moves"
      ).innerHTML = `You chose ${playerMove}. Computer chose ${computerMove}`;
      updateScore(result);
    }
  } else {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem("score");

    // Show the modal instead of the alert
    showResultModal("Score was reset!");
    document.querySelector(".js-result").innerHTML = "";
    document.querySelector(".js-moves").innerHTML = "";
    updateScoreElement();
  }
}

function updateScore(result) {
  if (result === "Win.") {
    score.wins++;
  } else if (result === "Lose.") {
    score.losses++;
  } else {
    score.ties++;
  }

  updateScoreElement();
  localStorage.setItem("score", JSON.stringify(score));

  // Show the modal instead of the alert
  showResultModal(
    `You picked ${playerMove}. Computer picked ${computerMove}. You ${result}!
            Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}`
  );
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}`;
}

function showResultModal(message) {
  const modalOverlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("myModal");
  const modalContent = modal.querySelector(".modal-content");

  modalContent.textContent = message;
  modal.style.display = "block";
  modalOverlay.style.display = "block";
}

function closeModal() {
  const modalOverlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("myModal");

  modal.style.display = "none";
  modalOverlay.style.display = "none";
}

function resetGame() {
  play("Reset");
}
