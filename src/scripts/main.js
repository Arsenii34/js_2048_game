'use strict';

const Game = require('../modules/Game.class');
const game = new Game();

// Write your code here
const loseMesseg = document.querySelector('.message-lose');
const winMesseg = document.querySelector('.message-win');
const startMesseg = document.querySelector('.message-start');
const start = document.querySelector('.button.start');
const cellElement = document.querySelectorAll('.field-cell');
 const mapColor = {
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e'
 }
 function updateCellColors ( importance){
  cellElement.forEach(element => {
    let need = element.textContent;
    let value = Number(need);
      element.style.background = mapColor[value] || '#d6cdc4';
  });
 }
function startGame() {
  game.restart();
  game.score = 0;
  game.status = 'playing';
  render();
}

function render() {
  const grid = game.getState();



  const cells = document.querySelectorAll('.field-cell');
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
  updateCellColors();
}

start.addEventListener('click', () => {
  startGame();
});

const moveMap = {
  left: () => game.moveLeft(),
  right: () => game.moveRight(),
  up: () => game.moveUp(),
  down: () => game.moveDown(),
};

const move = (direction) => {
  const action = moveMap[direction];

  if (action) {
    const moved = action();

    if (moved) {
      game.addRandomTile();
      game.checkWin();
      game.checkLose();
      render();
    }
  }
};


document.addEventListener('keydown', function (eventt) {
  switch (eventt.key) {
    case 'ArrowLeft':
    case 'a':
      move('left');
      break;
    case 'ArrowRight':
    case 'd':
      move('right');
      break;
    case 'ArrowUp':
    case 'w':
      move('up');
      break;
    case 'ArrowDown':
    case 's':
      move('down');
      break;
  }
});
