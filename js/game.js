let deck = [];
const types = ["C", "D", "H", "S"];
const figures = ["A", "J", "Q", "K"];

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

  console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

createDeck();
