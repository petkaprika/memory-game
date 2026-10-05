import { cardPairs } from "./cards.js";

const numberOfPairs = 8;
let firstCard = null;
let secondCard = null;
let timerId;
let movesCount = 0;
let pairsCount = 0;
const leaderboardLimit = 10;

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
newGameBtn.addEventListener('click', newGame);

const leaderboardBtn = document.createElement('button');
leaderboardBtn.classList.add('button');
leaderboardBtn.textContent = 'Leaderboard';
leaderboardBtn.addEventListener('click', showLeaderboardModal);

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

const modal = document.createElement('div');
modal.classList.add('modal');
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

const modalContent = document.createElement('div');
modalContent.classList.add('modal__content');

const modalDescription = document.createElement('p');
modalDescription.textContent = 'Congratulations! You won!';

const numberOfMoves = document.createElement('p');

const buttonsContainer = document.createElement('div');


const newGameModalBtn = document.createElement('button');
newGameModalBtn.textContent = 'New game';
newGameModalBtn.classList.add('button');
newGameModalBtn.addEventListener('click', newGame);

const closeBtn = document.createElement('button');
closeBtn.classList.add('button');
closeBtn.textContent = 'Close';
closeBtn.addEventListener('click', closeModal);

buttonsContainer.append(newGameModalBtn, closeBtn);
buttonsContainer.classList.add('modal__buttons');

modalContent.append(modalDescription, numberOfMoves, buttonsContainer);

modal.append(modalContent);
main.append(modal);

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('modal_open')) {
        closeModal();
    }
});

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
            updateMoves();
            secondCard = card;
            cardBack.classList.add('game-board__card-back_open');
            if (firstCard.dataset.pair === secondCard.dataset.pair) {
                markCards();
            } else {
                console.log('not pair');
                timerId = setTimeout(closeCards, 1000, firstCard, secondCard);
            }

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
        saveResult();
        showVictoryModal();
    }
}

function closeModal() {
    modal.classList.remove('modal_open');
    body.classList.remove('body_lock');
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

function newGame() {
    clearTimeout(timerId);
    timerId = null;
    firstCard = null;
    secondCard = null;
    movesCount = 0;
    pairsCount = 0;
    moves.textContent = `Moves: ${movesCount}`;
    pairs.textContent = `Pairs: ${pairsCount} / ${numberOfPairs}`;

    shuffleCards(cards);

    gameBoard.replaceChildren();
    const fragment = document.createDocumentFragment();
    cards.forEach(card => fragment.append(createCard(card)));
    gameBoard.append(fragment);

    closeModal();
}

function saveResult() {
    const results = JSON.parse(localStorage.getItem('memoryGameResults')) || [];

    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const result = {
        moves: movesCount,
        date: `${day}.${month}.${year}`,
        timestamp: Date.now(),
    };

    results.push(result);

    localStorage.setItem('memoryGameResults', JSON.stringify(results));
}

function getLeaderboard() {
    const results = JSON.parse(localStorage.getItem('memoryGameResults')) || [];

    const copyResults = [...results];
    copyResults.sort((a, b) => {
        if (a.moves !== b.moves) {
            return a.moves - b.moves;
        }
        return a.timestamp - b.timestamp;
    });

    return copyResults;
}

function showVictoryModal() {
    renderVictoryModal();
    modal.classList.add('modal_open');
    body.classList.add('body_lock');
}

function showLeaderboardModal() {
    renderLeaderboardModal();
    modal.classList.add('modal_open');
    body.classList.add('body_lock');
}

function renderVictoryModal() {
    modalContent.replaceChildren();

    numberOfMoves.textContent = `Number of moves: ${movesCount}`;

    modalContent.append(
        modalDescription,
        numberOfMoves,
        buttonsContainer
    );
}

function renderLeaderboardModal() {
    const results = getLeaderboard().slice(0, leaderboardLimit);

    modalContent.replaceChildren();

    const leaderboardTitle = document.createElement('p');
    leaderboardTitle.textContent = 'Leaderboard';

    modalContent.append(leaderboardTitle);

    if (results.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No games yet';

        modalContent.append(emptyMessage, closeBtn);

        return;
    }

    const leaderboardList = document.createElement('ol');

    results.forEach((result) => {
        const leaderboardItem = document.createElement('li');
        leaderboardItem.textContent =
            `${result.moves} moves — ${result.date}`;

        leaderboardList.append(leaderboardItem);
    });

    modalContent.append(leaderboardList, closeBtn);
}


