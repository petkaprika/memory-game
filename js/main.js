import { cardPairs } from "./cards.js";

const numberOfPairs = 8;
let firstCard = null;
let secondCard = null;
let timerId;
let movesCount = 0;
let pairsCount = 0;

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

gameBoard.addEventListener('click', (event) => {
    const card = event.target.closest('.game-board__card');
    if (card) {
        openCard(card);
    }
});

main.append(gameBoard);

const cards = cardPairs.concat(cardPairs);

shuffleCards(cards);

cards.forEach(card => gameBoard.append(createCard(card)));

function openCard(card) {
    if (card.classList.contains('game-board__card_found')) {
        return;
    }
    const cardBack = card.querySelector('.game-board__card-back');
    if (!cardBack.classList.contains('game-board__card-back_open')) {
        if (!firstCard) {
            firstCard = card;
            cardBack.classList.add('game-board__card-back_open');
        } else if (!secondCard) {
            secondCard = card;
            cardBack.classList.add('game-board__card-back_open');
            if (firstCard.dataset.pair === secondCard.dataset.pair) {
                markCards();
            } else {
                console.log('not pair');
                timerId = setTimeout(closeCards, 1000, firstCard, secondCard);
            }
            updateMoves();
        }
    };
}

function updatePairs() {
    pairsCount++;
    pairs.textContent = `Pairs: ${pairsCount} / ${numberOfPairs}`;
    checkVictory();
}

function checkVictory() {
    if (pairsCount === numberOfPairs) {
        console.log('Victory');
    }
}

function updateMoves() {
    movesCount++;
    moves.textContent = `Moves: ${movesCount}`;
}

function markCards() {
    firstCard.classList.add('game-board__card_found');
    secondCard.classList.add('game-board__card_found');
    firstCard = null;
    secondCard = null;
    updatePairs();
}

function closeCards(...cards) {
    cards.forEach(card => {
        const cardBack = card.querySelector('.game-board__card-back');
        cardBack.classList.remove('game-board__card-back_open');
    });
    firstCard = null;
    secondCard = null;
}

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
    container.dataset.pair = `${card.pair}`;

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






