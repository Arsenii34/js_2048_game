'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */

class Game {
  getCords(grid) {
    const needMasiv = [];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        needMasiv.push([row, col]);
      }
    }

    return needMasiv;
  }

  forEachCell(grid, callback) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        callback(row, col);
      }
    }
  }
  getEmptyCells(grid) {
    const emptyCells = [];

    this.forEachCell(grid, (row, col) => {
      if (grid[row][col] === null) {
        emptyCells.push([row, col]);
      }
    });

    return emptyCells;
  }
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    this.grid =
      initialState ||
      Array(4)
        .fill(null)
        .map(() => Array(4).fill(null));
    this.score = 0;
    this.status = 'idle';
    // eslint-disable-next-line no-console
    console.log(initialState);
  }

  moveLeft() {
    for (let row = 0; row < this.grid.length; row++) {
      this.grid[row] = this.mergeRow(this.grid[row]);
    }

    this.insertRandomTile();
    this.checkWin();
    this.checkLose();
  }

  moveRight() {
    for (let row = 0; row < this.grid.length; row++) {
      const reversedRow = [...this.grid[row]].reverse();
      const merged = this.mergeRow(reversedRow);

      this.grid[row] = merged.reverse();
    }

    this.addRandomTile();
    this.checkWin();
    this.checkLose();
  }

  moveUp() {
    for (let x = 0; x < 4; x++) {
      const colum = [];

      this.mergeColumnWithDirection(colum, 'up', x);
    }
    this.insertRandomTile();
    this.checkWin();
    this.checkLose();
  }

  moveDown() {
    for (let x = 0; x < 4; x++) {
      const colum = [];

      this.mergeColumnWithDirection(colum, 'down', x);
    }
    this.insertRandomTile();
    this.checkWin();
    this.checkLose();
  }

  /**
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    return this.grid;
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */

  mergeRow(rowArray) {
    let copy = rowArray.filter((n) => n !== null);

    for (let i = 0; i < copy.length - 1; i++) {
      if (copy[i] === copy[i + 1]) {
        copy[i] += copy[i + 1];
        this.score += copy[i];
        copy[i + 1] = null;
      }
    }
    copy = copy.filter((n) => n !== null);

    while (copy.length < 4) {
      copy.push(null);
    }

    return copy;
  }

  mergeColumnWithDirection(colum, direction, colIndex) {
    for (let row = 0; row < this.grid.length; row++) {
      colum.push(this.grid[row][colIndex]);
    }

    let copy = [...colum].filter((n) => n !== null);

    if (direction === 'up') {
      for (let i = 0; i < copy.length - 1; i++) {
        if (copy[i] === copy[i + 1]) {
          copy[i] = copy[i] + copy[i + 1];
          copy[i + 1] = null;
          this.score += copy[i];
        }
      }
    }
    copy = copy.filter((n) => n !== null);

    let x = 4 - copy.length;

    while (x !== 0) {
      copy.push(null);
      x--;
    }

    if (direction === 'down') {
      for (let i = copy.length - 1; i > 0; i--) {
        if (copy[i] === copy[i - 1]) {
          copy[i] = copy[i] + copy[i - 1];
          copy[i - 1] = null;
          this.score += copy[i];
        }
      }
    }
    copy = copy.filter((n) => n !== null);
    x = 4 - copy.length;

    while (x !== 0) {
      copy.unshift(null);
      x--;
    }

    for (let row = 0; row < this.grid.length; row++) {
      this.grid[row][colIndex] = copy[row];
    }
  }

  getStatus() {
    return `${this.status}`;
  }

  /**
   * Starts the game.
   */
  start() {
    this.status = 'playing';
  }

  /**
   * Resets the game.
   */

  restart() {
    const grid = Array(4)
      .fill(null)
      .map(() => Array(4).fill(null));

    this.grid = grid;
    this.status = 'playing';

    const generateRandomTileValue = () => {
      const value = Math.floor(Math.random() < 0.9 ? 2 : 4);

      return value;
    };

    function insertRandomTile(grid, value, emptyCells) {
      const randomCell = Math.floor(Math.random() * emptyCells.length);
      const [row, col] = emptyCells[randomCell];

      return (grid[row][col] = value);
    }

    let emptyCells = this.getEmptyCells(grid);
    const value1 = generateRandomTileValue();

    insertRandomTile(grid, value1, emptyCells);
    emptyCells = this.getEmptyCells(grid);

    const value2 = generateRandomTileValue();

    insertRandomTile(grid, value2, emptyCells);
  }

  checkWin() {
    let found = false;

    this.forEachCell(this.grid, (row, col) => {
      if (this.grid[row][col] === 2048) {
        this.status = 'win';
        found = true;
      }
    });

    return found;
  }

  checkLose() {
    let foundMove = false;

    this.forEachCell(this.grid, (row, col) => {
      const value = this.grid[row][col];

      if (value === null || value === 0) {
        foundMove = true;

        return;
      }

      if (col < this.grid[row].length - 1) {
        if (this.grid[row][col + 1] === value) {
          foundMove = true;

          return;
        }
      }

      if (row < this.grid.length - 1) {
        if (this.grid[row + 1][col] === value) {
          foundMove = true;
        }
      }
    });

    return (this.status = foundMove ? 'playing' : 'lose');
  }
  addRandomTile() {
    const emptyCells = [];

    this.forEachCell(this.grid, (row, col, value) => {
      if (value === null) {
        emptyCells.push({ row, col });
      }
    });

    const randomCell = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomCell];
    const { row, col } = cell;
    const need = Math.random() < 0.9 ? 2 : 4;

    this.grid[row][col] = need;
  }
}

module.exports = Game;
