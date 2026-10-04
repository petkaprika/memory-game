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





