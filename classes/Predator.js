"use strict";

class Predator {
    constructor(x, y, id, matrix, objectsMatrix) {
        this.x = x;
        this.y = y;
        this.matrix = matrix;
        this.objectsMatrix = objectsMatrix;
        this.id = id;
        this.energy = 17;
        this.updateCoordinates();
    }

    chooseCell(characterId) {
        this.updateCoordinates();
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

    updateCoordinates() {
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

    multiply() {

        let targetCells = this.chooseCell(0);
        let newCell = random(targetCells);

        if (this.energy >= 21 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;

            let newPredator = new Predator(newX, newY, this.id, this.matrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newPredator;

            this.energy = 20;
        }
    }

    move() {
        let targetCells = this.chooseCell(0);
        let newCell = random(targetCells);

        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            this.matrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;

            this.energy -= 0.5;
        }

        this.die();

    }

    eat() {
        let targetCells = this.chooseCell(2);
        let newCell = random(targetCells);

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

            this.multiply();
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

    update() {
        this.eat();
    }
}