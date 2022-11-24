"use strict";

const Parent = require('./Parent');

module.exports = class GrassEater extends Parent {
  constructor(x, y, id, matrix, objectsMatrix, creatureCount) {
    super(x, y, id, matrix, objectsMatrix, creatureCount);
    this.energy = 8;
    this.updateCoordinates();
  }

  multiply() {
    let targetCells = this.chooseCell(0);
    let newCell = super.random(targetCells);

    if (this.energy >= 20 && newCell) {
      let newX = newCell[0];
      let newY = newCell[1];

      this.matrix[newY][newX] = this.id;

      let newGrassEater = new GrassEater(
        newX,
        newY,
        this.id,
        this.matrix,
        this.objectsMatrix,
        this.creatureCount
      );
      this.objectsMatrix[newY][newX] = newGrassEater;
      this.creatureCount.grassEater++;

      this.energy = 8;
    }
  }

  update() {
    this.eat(1, 1, 2);
  }
}
