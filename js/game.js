const bjModule = (() => {
  "use strict";

  let deck = [];
  const types = ["C", "D", "H", "S"],
    figures = ["A", "J", "Q", "K"];

  let playersPoints = [];

  const btnTake = document.querySelector("#btnTake"),
    btnStop = document.querySelector("#btnStop"),
    btnNew = document.querySelector("#btnNew");

  const divPlayersCards = document.querySelectorAll(".divCards"),
    htmlPoints = document.querySelectorAll(".points");

  const modalClose = document.querySelector(".modal__close"),
    modalSection = document.querySelector(".modal__section"),
    modalTitle = document.querySelector(".modal__title"),
    modalImg = document.querySelector(".modal__img");

  //Function to start game -----------
  const startGame = (numPlayers = 2) => {
    deck = createDeck();
    playersPoints = [];
    for (let i = 0; i < numPlayers; i++) {
      playersPoints.push(0);
    }

    htmlPoints.forEach((el) => (el.innerText = 0));
    htmlPoints.forEach((el) => (el.style.color = "#fff"));
    divPlayersCards.forEach((el) => (el.innerHTML = ""));

    btnStop.disabled = false;
    btnTake.disabled = false;
  };

  //Function to create a deck and shuffle it later ------------
  const createDeck = () => {
    deck = [];
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
    return _.shuffle(deck);
  };

  //Function to take a card ------------
  const takeCard = () => {
    if (deck.length === 0) {
      throw "There are no cards left in deck";
    }
    return deck.pop();
  };

  //Function to calculate card value ------------
  const valueCard = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
  };

  //Function to create card ------------
  const createCard = (card, turn) => {
    const imgCard = document.createElement("img");
    imgCard.src = `assets/${card}.png`;
    imgCard.classList.add("carta");
    divPlayersCards[turn].append(imgCard);
  };

  //Function to check the winner
  const checkWinner = () => {
    const [earnedPoints, computerPoints] = playersPoints;

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
    }, 100);
  };

  //Function to accumulate points ------------
  const accumulatePoints = (card, turn) => {
    playersPoints[turn] = playersPoints[turn] + valueCard(card);
    htmlPoints[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
  };

  //Function for the computer turn ------------
  const computerTurn = (earnedPoints) => {
    let computerPoints = 0;
    do {
      const card = takeCard();
      computerPoints = accumulatePoints(card, playersPoints.length - 1);
      createCard(card, playersPoints.length - 1);
    } while (computerPoints < earnedPoints && earnedPoints <= 21);
    checkWinner();
  };

  //Events ------------
  btnTake.addEventListener("click", () => {
    const card = takeCard();
    const playerPoints = accumulatePoints(card, 0);

    createCard(card, 0);

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
    btnStop.disabled = true;
    btnTake.disabled = true;
    computerTurn(playersPoints[0]);
  });

  btnNew.addEventListener("click", () => {
    startGame();
  });

  modalClose.addEventListener("click", () => {
    modalSection.classList.add("modal--hide");
  });

  return {
    newGame: startGame,
  };
})();
