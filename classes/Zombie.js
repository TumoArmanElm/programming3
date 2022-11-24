"use strict";

const Parent = require('./Parent');

module.exports = class Zombie extends Parent {
  constructor(x, y, id, matrix, objectsMatrix, creatureCount) {
    super(x, y, id, matrix, objectsMatrix, creatureCount);
    this.infestPower = 5;
    /// այս փոփոխականը ես ավելացրել եմ որովհետև Զոմբիների lastStand(); ֆունքցիան չափից շատ կանչելու պատճառով այս Error ն էր բերում Uncaught RangeError: Maximum call stack size exceeded;
    this.zombieStandingPower = 10;
    ////////////////////////////////////////////////////
    this.energy = 100;
    this.updateCoordinates();
  }

  move() {
    let targetCells = this.chooseCell(0);
    let newCell = super.random(targetCells);

    if (this.energy > 0 && newCell) {
      let newX = newCell[0];
      let newY = newCell[1];

      this.matrix[newY][newX] = this.id;
      this.matrix[this.y][this.x] = 0;

      this.objectsMatrix[newY][newX] = this;
      this.objectsMatrix[this.y][this.x] = null;

      this.x = newX;
      this.y = newY;

      this.energy--;
    }

    this.lastStand();
  }

  infest() {
    let humanCells = this.chooseCell(4);
    let chosenHuman = super.random(humanCells);

    if (this.energy > 0 && chosenHuman && this.infestPower > 0) {
      let newX = chosenHuman[0];
      let newY = chosenHuman[1];

      this.matrix[newY][newX] = this.id;

      this.objectsMatrix[newY][newX] = new Zombie(
        newX,
        newY,
        this.id,
        this.matrix,
        this.objectsMatrix,
        this.creatureCount
      );
        this.creatureCount.zombie++;
      if (this.infestPower > 0 && this.energy <= 0) {
        this.infestPower = 0;
      } else if (this.infestPower > 0 && this.energy > 0) {
        this.infestPower--;
      }
    } else {
      this.eat();
    }
  }

  eat() {
    let targetCells = this.chooseCell(3);
    let newCell = super.random(targetCells);

    if (this.energy > 0 && newCell) {
      let newX = newCell[0];
      let newY = newCell[1];

      this.matrix[newY][newX] = this.id;
      this.matrix[this.y][this.x] = 0;

      this.objectsMatrix[newY][newX] = this;
      this.objectsMatrix[this.y][this.x] = null;

      this.x = newX;
      this.y = newY;

      this.energy += 3;
    } else {
      this.move();
    }
  }

  die() {
    if (this.energy <= 0) {
      this.matrix[this.y][this.x] = 0;
      this.objectsMatrix[this.y][this.x] = null;
    }
  }

  lastStand() {
    if (this.zombieStandingPower > 0) {
      this.zombieStandingPower--;
      if (
        this.infestPower >= 5 &&
        this.energy <= 0 &&
        this.zombieStandingPower > 0
      ) {
        this.update();
      } else if (this.infestPower <= 0 && this.energy <= 0) {
        this.die();
      }
    } else {
      this.die();
    }
  }

  update() {
    this.infest();
  }
}
