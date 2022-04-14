let deck = [];
const types = ["C", "D", "H", "S"];
const figures = ["A", "J", "Q", "K"];

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
  console.log(deck);
  return deck;
};

createDeck();

//Function to take a card ------------
const takeCard = () => {
  if (deck.length === 0) {
    throw "There are no cards left in deck";
  }
  const card = deck.pop();
  console.log(deck);
  console.log(card);
  return card;
};

//Function to calculate card value ------------
const valueCard = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
};

const value = valueCard(takeCard());
console.log({ value });
