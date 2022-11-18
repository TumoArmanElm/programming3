"use strict";

class GrassEater extends Parent {

    constructor(x, y, id, matrix, objectsMatrix) {
       super(x, y, id, matrix, objectsMatrix);
        this.energy = 8;
        this.updateCoordinates();
    }


    multiply() {

        let targetCells = this.chooseCell(0);
        let newCell = random(targetCells);

        if (this.energy >= 20 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;

            let newGrassEater = new GrassEater(newX, newY, this.id, this.matrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newGrassEater;

            this.energy = 8;
        }
    }

    update() {
        this.eat(1, 1, 2);
    }
}