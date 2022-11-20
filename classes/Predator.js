"use strict";

class Predator extends Parent {
  constructor(x, y, id, matrix, objectsMatrix) {
    super(x, y, id, matrix, objectsMatrix);
    this.energy = 17;
    this.updateCoordinates();
  }

  multiply() {
    let targetCells = this.chooseCell(0);
    let newCell = random(targetCells);

    if (this.energy >= 21 && newCell) {
      let newX = newCell[0];
      let newY = newCell[1];

      this.matrix[newY][newX] = this.id;

      let newPredator = new Predator(
        newX,
        newY,
        this.id,
        this.matrix,
        this.objectsMatrix
      );
      this.objectsMatrix[newY][newX] = newPredator;

      this.energy = 20;
    }
  }

  update() {
    this.eat(2, 3, 0.5);
  }
}
