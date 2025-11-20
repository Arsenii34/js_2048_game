'use strict';

const Game = require('../modules/Game.class');
const game = new Game();

// Write your code here
const loseMesseg = document.querySelector('.message-lose');
const winMesseg = document.querySelector('.message-win');
const startMesseg = document.querySelector('.message-start');
const start = document.querySelector('.button .start');

function startGame() {
  game.restart();
  game.score = 0;
  game.status = 'playing';
  render();
}

function render() {
  const grid = game.getState();
  const cells = document.querySelectorAll('.cell');
  const score = document.querySelector('.game-score');

  score.textContent = game.getScore();

  let i = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const val = grid[r][c];
      const cell = cells[i++];

      cell.textContent = val || '';
    }
  }
  winMesseg.classList.toggle('hidden', game.status !== 'win');
  loseMesseg.classList.toggle('hidden', game.status !== 'lose');
  startMesseg.classList.toggle('hidden', game.status === 'playing');
}

start.addEventListener('click', () => {
  startGame();
});

document.addEventListener('keydown', function (eventt) {
  switch (eventt.key) {
    case 'ArrowLeft':
    case 'a':
      if (game.moveLeft()) {
        game.addRandomTile();
        game.checkWin();
        game.checkLose();
        render();
      }
      break;
    case 'ArrowRight':
    case 'd':
      if (game.moveRight()) {
        game.addRandomTile();
        game.checkWin();
        game.checkLose();
        render();
      }
      break;
    case 'ArrowUp':
    case 'w':
      if (game.moveUp()) {
        game.addRandomTile();
        game.checkWin();
        game.checkLose();
        render();
      }
      break;
    case 'ArrowDown':
    case 's':
      if (game.moveDown()) {
        game.addRandomTile();
        game.checkWin();
        game.checkLose();
        render();
      }
      break;
  }
});
