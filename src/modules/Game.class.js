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
    let changed = false;
    for (let row = 0; row < this.grid.length; row++) {
      const old = [...this.grid[row]];
      let need = this.mergeRow(old);
      this.grid[row] = need;
      let neww = [...this.grid[row]];
       console.log(`Row ${row} before merge:`, old);
       console.log(`Row ${row} after merge:`, neww);
      if(JSON.stringify(neww) !== JSON.stringify(old)){
          changed = true;
      }
    }
    if(changed){
    this.addRandomTile();
    this.checkWin();
    this.checkLose();
    }
    return changed;
  }

  moveRight() {
     let changed = false;
    for (let row = 0; row < this.grid.length; row++) {
      const old = [...this.grid[row]];
      let need = this.mergeRowRigth(old);
      const neww = [...need];
      this.grid[row] = need;
       console.log(`Row ${row} before merge:`, old);
       console.log(`Row ${row} after merge:`, neww);
        if(JSON.stringify(neww) !== JSON.stringify(old)){
          changed = true;
        }
    }
    if(changed){
      this.addRandomTile();
      this.checkWin();
      this.checkLose();
    }
  return changed;
  }

  moveUp() {
     let changed = false;
    let columnArray = [];
    for (let columnIndex = 0; columnIndex < 4; columnIndex++){
      for (let row = 0; row < this.grid[columnIndex].length; row++){
        let need = this.grid[row][columnIndex];
        columnArray.push(need);
      }
      let n = this.mergeColumn(columnArray, 'up', columnIndex);
      columnArray = [];
      changed = changed || n[0];
    }
   if (changed) {
  this.addRandomTile();
  this.checkWin();
  this.checkLose();
}

    return changed;
  }

  moveDown() {
    let changed = false;
    let columnArray = [];
    for (let columnIndex = 0; columnIndex < 4; columnIndex++){
      for (let row = 0; row < this.grid[columnIndex].length; row++){
        let need = this.grid[row][columnIndex];
        columnArray.push(need);
      }
      let n = this.mergeColumn(columnArray, 'down', columnIndex);
      columnArray = [];
      changed = changed || n[0];
    }
   if (changed) {
  this.addRandomTile();
  this.checkWin();
  this.checkLose();
}

    return changed;
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

   mergeRow (rowArray){
    console.log(rowArray);
    let startLenth = rowArray.length;
    let copy = [];
      for(let i = 0; i < rowArray.length - 1; i++){
        if(rowArray[i] !== null && rowArray[i] === rowArray[i + 1]){
          rowArray[i] += rowArray[i + 1];
          rowArray[i + 1] = null;
          this.score += rowArray[i];
          copy.push(rowArray[i]);
        }
        else if (rowArray[i] !== null){
          copy.push(rowArray[i]);
        }
      }
       if (rowArray[rowArray.length - 1] !== null){
          copy.push(rowArray[rowArray.length - 1]);
        }

        while (copy.length < startLenth){
          copy.push(null);
        }
        console.log(copy);
    return copy;
   }
    mergeRowRigth (rowArray){
      console.log(rowArray);
      let reverse = [...rowArray].reverse();
      let need  = this.mergeRow(reverse);
      let result = need.reverse();
      console.log (result);
      return result;
    }
  // mergeRow(rowArray) {
  //   console.log("mergeRow input:", rowArray);
  //   let copy = rowArray.filter((n) => n !== null);

  //   for (let i = 0; i < copy.length - 1; i++) {
  //     if (copy[i] === copy[i + 1]) {
  //       copy[i] += copy[i + 1];
  //       this.score += copy[i];
  //       copy[i + 1] = null;
  //     }
  //   }
  //   copy = copy.filter((n) => n !== null);

  //   while (copy.length < 4) {
  //     copy.push(null);
  //   }
  //   console.log(copy);
  //   return copy;
  // }

    mergeColumn(columnArray, direction, columnIndex){
      let changed = false;
      console.log(columnArray, direction);
      const origin = [...columnArray];
      const startLength = columnArray.length;
      let need = columnArray.filter(col => col !== null);
      if(direction === 'up'){
        for(let i = 0; i < need.length - 1; i++){
          if(need[i] === need[i + 1]){
            need[i] += need[i + 1];
            need[i + 1] = null;
            this.score += need[i];
        }
          }
          need = need.filter(coll => coll !== null);
          while(need.length < startLength){
            need.push(null);
          }
          for (let row = 0; row < this.grid.length; row++){
    this.grid[row][columnIndex] = need[row];
  };
  if(JSON.stringify(origin) !== JSON.stringify(need)){
            changed = true;
          }
    }

      if (direction === 'down') {
    let need2 = columnArray.filter(col => col !== null);
    for (let i = need2.length - 1; i > 0; i--) {
      if (need2[i] === need2[i - 1]) {
        need2[i] += need2[i - 1];
        need2[i - 1] = null;
        this.score += need2[i];
      }
    }
    need2 = need2.filter(n => n !== null);
    while (need2.length < startLength) {
      need2.unshift(null);
    }
    for (let row = 0; row < this.grid.length; row++){
    this.grid[row][columnIndex] = need2[row];
  }
   if(JSON.stringify(origin) !== JSON.stringify(need2)){
            changed = true;
          }
  }


          return [changed, this.grid];
    }
  // mergeColumnWithDirection(colum, direction, colIndex) {
  //   let changed = false;
  //   let origin = [];
  //   for (let row = 0; row < this.grid.length; row++) {
  //     origin.push(this.grid[row][colIndex]);
  //   }

  //   let copy = [...origin].filter((n) => n !== null);

  //   if (direction === 'up') {
  //     for (let i = 0; i < copy.length - 1; i++) {
  //       if (copy[i] === copy[i + 1]) {
  //         copy[i] = copy[i] + copy[i + 1];
  //         copy[i + 1] = null;
  //         this.score += copy[i];
  //       }
  //     }
  //   }
  //   copy = copy.filter((n) => n !== null);

  //   let x = 4 - copy.length;

  //   while (x !== 0) {
  //     copy.push(null);
  //     x--;
  //   }

  //   if (direction === 'down') {
  //     for (let i = copy.length - 1; i > 0; i--) {
  //       if (copy[i] === copy[i - 1]) {
  //         copy[i] = copy[i] + copy[i - 1];
  //         copy[i - 1] = null;
  //         this.score += copy[i];
  //       }
  //     }
  //   }
  //   copy = copy.filter((n) => n !== null);
  //   x = 4 - copy.length;

  //   while (x !== 0) {
  //     copy.unshift(null);
  //     x--;
  //   }

  //   for (let row = 0; row < this.grid.length; row++) {
  //     this.grid[row][colIndex] = copy[row];
  //   }
  //   if(JSON.stringify(origin) !== JSON.stringify(copy)){
  //     changed = true;
  //   }
  //   return changed;
  // }


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
    this.grid = Array(4)
      .fill(null)
      .map(() => Array(4).fill(null));

    this.status = 'playing';
    this.addRandomTile();
    this.addRandomTile();
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

    this.forEachCell(this.grid, (row, col) => {
      if (this.grid[row][col] === null) {
        emptyCells.push({ row, col });
      }
    });

    if (emptyCells.length === 0) {
      return false;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row: r, col: c } = emptyCells[randomIndex];
    const need = Math.random() < 0.9 ? 2 : 4;

    this.grid[r][c] = need;

    return true;
  }
}

module.exports = Game;
