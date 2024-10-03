let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(iconClass, index) {
  const card = document.createElement("div");
  card.classList.add("card", "hidden");
  card.dataset.index = index;
  card.innerHTML = `<i class="${iconClass}"></i>`;
  card.addEventListener("click", flipCard);
  return card;
}

function renderGame() {
  const icons = [
    "devicon-html5-plain",
    "devicon-html5-plain",
    "devicon-css3-plain",
    "devicon-css3-plain",
    "devicon-javascript-plain",
    "devicon-javascript-plain",
    "devicon-nodejs-plain",
    "devicon-nodejs-plain",
    "devicon-react-original",
    "devicon-react-original",
    "devicon-git-plain",
    "devicon-git-plain",
    "devicon-github-plain",
    "devicon-github-plain",
    "devicon-bootstrap-plain",
    "devicon-bootstrap-plain",
  ];
  shuffle(icons);

  const memoryGame = document.getElementById("memory-game");
  memoryGame.innerHTML = "";

  icons.forEach((iconClass, index) => {
    const card = createCard(iconClass, index);
    memoryGame.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length < 2) {
    const clickedCard = this;
    clickedCard.classList.remove("hidden");
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.innerHTML === card2.innerHTML) {
    matchedCards.push(card1, card2);
    if (matchedCards.length === 16) {
      showModal();
    }
  } else {
    card1.classList.add("hidden");
    card2.classList.add("hidden");
  }

  flippedCards = [];
}

function showModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
}

function restartGame() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";

  flippedCards = [];
  matchedCards = [];
  renderGame();
}

renderGame();
