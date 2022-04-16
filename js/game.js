let deck = [];
const types = ["C", "D", "H", "S"];
const figures = ["A", "J", "Q", "K"];

let playerPoints = 0;
let computerPoints = 0;

const btnTake = document.querySelector("#btnTake");
const btnStop = document.querySelector("#btnStop");
const btnNew = document.querySelector("#btnNew");
const divPlayerCards = document.querySelector("#player-cards");
const divComputerCards = document.querySelector("#computer-cards");
const htmlPoints = document.querySelectorAll("small");

//Function to create a deck and shuffle it later ------------
const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type);
    }
  }

  for (let type of types) {
    for (let figure of figures) {
      deck.push(figure + type);
    }
  }

  deck = _.shuffle(deck);
  return deck;
};

createDeck();

//Function to take a card ------------
const takeCard = () => {
  if (deck.length === 0) {
    throw "There are no cards left in deck";
  }
  const card = deck.pop();
  return card;
};

//Function to calculate card value ------------
const valueCard = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
};

//Function for the computer turn ------------
const computerTurn = (earnedPoints) => {
  do {
    const card = takeCard();
    computerPoints = computerPoints + valueCard(card);
    htmlPoints[1].innerText = computerPoints;

    const imgCard = document.createElement("img");
    imgCard.src = `assets/${card}.png`;
    imgCard.classList.add("carta");
    divComputerCards.append(imgCard);

    if (earnedPoints > 21) {
      break;
    }
  } while (computerPoints < earnedPoints && earnedPoints <= 21);

  setTimeout(() => {
    if (computerPoints === earnedPoints) {
      alert("Nobody wins");
    } else if (earnedPoints > 21) {
      alert("You loose player 1");
    } else if (computerPoints > 21) {
      alert("You win player 1");
    } else {
      alert("Computer wins");
    }
  }, 30);
};

//Events ------------
btnTake.addEventListener("click", () => {
  const card = takeCard();
  playerPoints = playerPoints + valueCard(card);
  htmlPoints[0].innerText = playerPoints;

  const imgCard = document.createElement("img");
  imgCard.src = `assets/${card}.png`;
  imgCard.classList.add("carta");
  divPlayerCards.append(imgCard);

  if (playerPoints > 21) {
    console.warn("Has perdido");
    btnTake.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerPoints);
  } else if (playerPoints === 21) {
    console.warn("Has llegado a 21");
    btnTake.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerPoints);
  }
});

btnStop.addEventListener("click", () => {
  computerTurn(playerPoints);
  btnStop.disabled = true;
  btnTake.disabled = true;
});

btnNew.addEventListener("click", () => {
  deck = [];
  createDeck();
  btnStop.disabled = false;
  btnTake.disabled = false;
  playerPoints = 0;
  computerPoints = 0;
  htmlPoints[0].innerText = 0;
  htmlPoints[1].innerText = 0;
  divPlayerCards.innerHTML = "";
  divComputerCards.innerHTML = "";
});
