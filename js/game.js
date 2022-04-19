(() => {
  "use strict";

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
  const htmlPoints = document.querySelectorAll(".points");

  const modalClose = document.querySelector(".modal__close");
  const modalSection = document.querySelector(".modal__section");
  const modalTitle = document.querySelector(".modal__title");
  const modalImg = document.querySelector(".modal__img");

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
        modalSection.classList.remove("modal--hide");
        modalTitle.innerText = "Nobody wins";
        modalImg.src = "assets/draw.gif";
        htmlPoints[0].style.color = "#000";
        htmlPoints[1].style.color = "#000";
      } else if (earnedPoints > 21) {
        modalSection.classList.remove("modal--hide");
        modalTitle.innerText = "Computer wins";
        modalImg.src = "assets/lose.gif";
        htmlPoints[0].style.color = "#B70027";
        htmlPoints[1].style.color = "#222272";
      } else if (computerPoints > 21) {
        modalSection.classList.remove("modal--hide");
        modalTitle.innerText = "You win Player 1";
        modalImg.src = "assets/win.gif";
        htmlPoints[0].style.color = "#222272";
        htmlPoints[1].style.color = "#B70027";
      } else {
        modalSection.classList.remove("modal--hide");
        modalTitle.innerText = "Computer wins";
        modalImg.src = "assets/lose.gif";
        htmlPoints[0].style.color = "#B70027";
        htmlPoints[1].style.color = "#222272";
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
      btnTake.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
    } else if (playerPoints === 21) {
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
    htmlPoints[0].style.color = "#fff";
    htmlPoints[1].style.color = "#fff";
    divPlayerCards.innerHTML = "";
    divComputerCards.innerHTML = "";
  });

  modalClose.addEventListener("click", () => {
    modalSection.classList.add("modal--hide");
  });
})();
