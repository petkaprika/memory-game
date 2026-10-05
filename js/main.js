import { cardPairs } from "./cards.js";

const numberOfPairs = 8;

const body = document.querySelector('body');
const application = document.createElement('div');

application.classList.add('application');

body.append(application);

const header = document.createElement('header');
header.classList.add('header');
application.append(header);

const newGameBtn = document.createElement('button');
newGameBtn.classList.add('button');
newGameBtn.textContent = 'New game';

const leaderboardBtn = document.createElement('button');
leaderboardBtn.classList.add('button');
leaderboardBtn.textContent = 'Leaderboard';

header.append(newGameBtn, leaderboardBtn);

const main = document.createElement('main');
main.classList.add('main');

application.append(main);

const gameInfo = document.createElement('div');
gameInfo.classList.add('game-info');

const moves = document.createElement('div');
moves.classList.add('game-info__moves');
moves.textContent = 'Moves: 0';

const pairs = document.createElement('div');
pairs.classList.add('game-info__pairs');
pairs.textContent = `Pairs: 0 / ${numberOfPairs}`;

gameInfo.append(moves, pairs);
main.append(gameInfo);

const gameBoard = document.createElement('div');
gameBoard.classList.add('game-board');

main.append(gameBoard);

const cards = cardPairs.concat(cardPairs);

shuffleCards(cards);

cards.forEach(card => gameBoard.append(createCard(card)));

function shuffleCards(cards) {
    let index = cards.length;

    while (index) {
        const i = Math.floor(Math.random() * index--);
        let element = cards[index];
        cards[index] = cards[i];
        cards[i] = element;
    }

    return cards;
}

function createCard(card) {
    const container = document.createElement('div');
    container.classList.add('game-board__card');

    const cardFront = document.createElement('div');
    cardFront.classList.add('game-board__card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('game-board__card-back');

    const image = document.createElement('img');
    image.src = `./assets/images/${card.image}`;
    image.alt = `${card.image}`;
    image.classList.add('game-board__img');

    cardBack.append(image);
    container.append(cardFront, cardBack);

    return container;
}






