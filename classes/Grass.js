"use strict";

class Grass {

    constructor(x, y, id, matrix, objectsMatrix) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.matrix = matrix;
        this.objectsMatrix = objectsMatrix;
        this.energy = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(characterId) {
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
           if (x >= 0 && x < this.matrix[0].length && y >= 0 && y < this.matrix.length) {
                if (this.matrix[y][x] == characterId) {
                    found.push(this.directions[i]);
                }
            }
        }
          
        return found;
    }

    multiply() {
        this.energy++;

        let targetCells = this.chooseCell(0);
        let newCell = random(targetCells);

        if (this.energy >= 6 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;

            let newGrass = new Grass(newX, newY, this.id, this.matrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newGrass;

            this.energy = 0;
        }
    }

    update() {
        this.multiply();
    }

}