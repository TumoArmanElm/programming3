class Farmer {
    constructor(x, y, id, matrix, objectsMatrix) {
        this.x = x;
        this.y = y;
        this.matrix = matrix;
        this.objectsMatrix = objectsMatrix;
        this.id = id;
        this.energy = 15;
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
        if (newCell == []) {
            targetCells = this.chooseCell(1);
            newCell = random(targetCells);
        };
        if (this.energy >= 20 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;

            let newPredator = new Farmer(newX, newY, this.id, this.matrix, this.objectsMatrix);
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

            this.energy--;
        }

        this.die();

    }

    eat() {
        let grassCells = this.chooseCell(1);
        let lowEnergyCell = random(grassCells);
        let grasseaterCells = this.chooseCell(2);
        let normalFood = random(grasseaterCells);
        if (this.energy > 0 && this.energy < 5 && lowEnergyCell) {
            let newX = lowEnergyCell[0];
            let newY = lowEnergyCell[1];

            this.matrix[newY][newX] = this.id;
            this.matrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;

            this.energy++;

            this.multiply();
        } else if (this.energy < 19 && normalFood) {
            let newX = normalFood[0];
            let newY = normalFood[1];

            this.matrix[newY][newX] = this.id;
            this.matrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;

            this.energy++;

            this.multiply();
        } else {
            this.move();
        }
    }


    fightingPredator() {
        let attackingPredator = this.chooseCell(3);
        let chosenPredator = random(attackingPredator);
        let randomWinner = random(0, 100) * this.energy / 2;
        if (this.energy > 5 && chosenPredator) {

            let newX = chosenPredator[0];
            let newY = chosenPredator[1];
            ////Farmer Wins
            if (randomWinner >= 69) {
                this.matrix[newY][newX] = this.id;
                this.matrix[this.y][this.x] = 0;

                this.objectsMatrix[newY][newX] = this;
                this.objectsMatrix[this.y][this.x] = null;

                this.x = newX;
                this.y = newY;

                this.energy += 10;

                this.multiply();
            }
            ////Predator Wins
            else if (randomWinner <= 60) {
                this.objectsMatrix[newY][newX].energy += 13;
                this.energy -= 13;
            }
            ////No Fight
            else {
                this.energy--;
                this.objectsMatrix[newY][newX].energy--;
            }
        }
        this.die();
    }

    die() {

        if (this.energy <= 0) {
            this.matrix[this.y][this.x] = 0;
            this.objectsMatrix[this.y][this.x] = null;
        }
    }
    update() {
        this.eat();
        this.fightingPredator();
    }
}