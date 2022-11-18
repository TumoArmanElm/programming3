"use strict";

const n = 70;
const m = 70;

const side = 10;

const matrix = createMatrix(n,m);
const objectsMatrix =  createObjectsMatrix(matrix);
function setup() {
    createCanvas(n * side, m * side);
    background('#acacac');
    frameRate(5);
}
function draw() {
    drawMatrix(matrix);
    updateObjectsMatrix(objectsMatrix);
}


function createObjectsMatrix(matrix) {
    const newObjectsMatrix = [];
    for (let y = 0; y < matrix.length; y++) {
        newObjectsMatrix[y] = [];
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                const newGrass = new Grass(x, y, 1, matrix, newObjectsMatrix);
                newObjectsMatrix[y][x] = newGrass;
            } else if (matrix[y][x] == 2) {
                const newGrassEater = new GrassEater(x, y, 2, matrix, newObjectsMatrix);
                newObjectsMatrix[y][x] = newGrassEater;
            } else if (matrix[y][x] == 3) {
                const newPredator = new Predator(x, y, 3, matrix, newObjectsMatrix);
                newObjectsMatrix[y][x] = newPredator;
            } else if (matrix[y][x] == 4) {
                const newFarmer = new Farmer(x, y, 4, matrix, newObjectsMatrix)
                newObjectsMatrix[y][x] = newFarmer;
            } else if (matrix[y][x] == 5) {
                const newZombie = new Zombie(x, y, 5, matrix, newObjectsMatrix)
                newObjectsMatrix[y][x] = newZombie;
            } else {
                newObjectsMatrix[y][x] = null;
            }
        }
    }
    return newObjectsMatrix;
}

function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('green');
            } else if (matrix[y][x] == 2) {
                fill('yellow');
            } else if (matrix[y][x] == 3) {
                fill('red');
            } else if (matrix[y][x] == 4) {
                fill('blue');
            } else if (matrix[y][x] == 5) {
                fill('purple');
            } else {
                fill('grey');
            }
            rect(x * side, y * side, side, side)
        }
    }
}
function updateObjectsMatrix(objectsMatrix) {
    for (var y = 0; y < objectsMatrix.length; y++) {
        for (let x = 0; x < objectsMatrix[y].length; x++) {
            const object = objectsMatrix[y][x];
            if (object) {
                object.update();
            }
        }
    }
}

function createMatrix(horizontallength, verticallength){
    const newMatrix = [];
    for (var y = 0; y < verticallength; y++) {
        newMatrix[y] = [];
        for (var x = 0; x < horizontallength; x++) {
            const coursor = Math.random() * 100;
            if (coursor <= 65) {
                newMatrix[y][x] = 1;
            } else if (coursor <= 66.3) {
                newMatrix[y][x] = 2;
            } else if (coursor < 68) {
                newMatrix[y][x] = 3;
            } else if (coursor < 69.6) {
                newMatrix[y][x] = 4;
            } else if (coursor < 70) {
                newMatrix[y][x] = 5;
            } else {
                newMatrix[y][x] = 0;
            }
        }
    }
    return newMatrix;
};