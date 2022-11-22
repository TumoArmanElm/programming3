"use strict";

class Grass extends Parent {
  multiply() {
    this.energy++;

    let targetCells = this.chooseCell(0);
    let newCell = random(targetCells);

    if (this.energy >= 6 && newCell) {
      let newX = newCell[0];
      let newY = newCell[1];

      this.matrix[newY][newX] = this.id;

      let newGrass = new Grass(
        newX,
        newY,
        this.id,
        this.matrix,
        this.objectsMatrix,
        this.creatureCount
      );
      this.objectsMatrix[newY][newX] = newGrass;
      this.creatureCount.grass++;

      this.energy = 0;
    }
  }

  update() {
    this.multiply();
  }
}
