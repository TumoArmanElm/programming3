// "use strict";

// const Grass = require("./classes/Grass");

// const creatureCount = {
//   grass: 0,
//   grassEater: 0,
//   predator: 0,
//   farmer: 0,
//   zombie: 0
// }

// //                 Canvas Variables
const horizontallength = 70;
const verticallength = 70;
const side = 10;
// // ---------------------------------------------------
// //                 Button Variables
// const restartBtn = document.getElementById("restart");
// const nextSeason = document.getElementById("season");
// const killCreatures = document.getElementById("killAll");
// // ---------------------------------------------------
// //                 Matrix Variables
// let matrix = createMatrix(horizontallength, verticallength);
// let objectsMatrix = createObjectsMatrix(matrix);
// // ---------------------------------------------------
// //                 Season Variables
// let seasonsId = 0;
// const seasons = ["Summer", "Fall", "Winter", "Spring"];
// let weather = seasons[0];
// // ---------------------------------------------------
let matrix = require("./server")

function setup() {
  createCanvas(horizontallength * side, verticallength * side);
  background("#acacac");
  frameRate(10);
}
function draw() {
  drawMatrix(matrix);
}

// function createObjectsMatrix(matrix) {
//   const newObjectsMatrix = [];
//   for (let y = 0; y < matrix.length; y++) {
//     newObjectsMatrix[y] = [];
//     for (let x = 0; x < matrix[y].length; x++) {
//       if (matrix[y][x] == 1) {
//         const newGrass = new Grass(x, y, 1, matrix, newObjectsMatrix, creatureCount);
//         newObjectsMatrix[y][x] = newGrass;
//         creatureCount.grass++;
//       } else if (matrix[y][x] == 2) {
//         const newGrassEater = new GrassEater(x, y, 2, matrix, newObjectsMatrix, creatureCount);
//         newObjectsMatrix[y][x] = newGrassEater;
//         creatureCount.grassEater++;
//       } else if (matrix[y][x] == 3) {
//         const newPredator = new Predator(x, y, 3, matrix, newObjectsMatrix, creatureCount);
//         newObjectsMatrix[y][x] = newPredator;
//         creatureCount.predator++;
//       } else if (matrix[y][x] == 4) {
//         const newFarmer = new Farmer(x, y, 4, matrix, newObjectsMatrix, creatureCount);
//         newObjectsMatrix[y][x] = newFarmer;
//         creatureCount.farmer++;
//       } else if (matrix[y][x] == 5) {
//         const newZombie = new Zombie(x, y, 5, matrix, newObjectsMatrix, creatureCount);
//         newObjectsMatrix[y][x] = newZombie;
//         creatureCount.zombie++;
//       } else {
//         newObjectsMatrix[y][x] = null;
//       }
//     }
//   }
//   console.log(creatureCount);
//   return newObjectsMatrix;
// }

function drawMatrix(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        seasonColor("green", "#875b09", "#d9e6cf", "#042b0f");
      } else if (matrix[y][x] == 2) {
        fill("yellow");
      } else if (matrix[y][x] == 3) {
        fill("red");
      } else if (matrix[y][x] == 4) {
        fill("blue");
      } else if (matrix[y][x] == 5) {
        fill("purple");
      } else {
        fill("grey");
      }
      rect(x * side, y * side, side, side);
    }
  }
}
// function updateObjectsMatrix(objectsMatrix, season) {
//   for (var y = 0; y < objectsMatrix.length; y++) {
//     for (let x = 0; x < objectsMatrix[y].length; x++) {
//       const object = objectsMatrix[y][x];
//       if (object) {
//         object.update();
//         object.season = season;
//       }
//     }
//   }
// }

// function createMatrix(horizontallength, verticallength) {
//   const newMatrix = [];
//   for (var y = 0; y < verticallength; y++) {
//     newMatrix[y] = [];
//     for (var x = 0; x < horizontallength; x++) {
//       const coursor = Math.random() * 100;
//       if (coursor <= 65) {
//         newMatrix[y][x] = 1;
//       } else if (coursor <= 66.3) {
//         newMatrix[y][x] = 2;
//       } else if (coursor < 68) {
//         newMatrix[y][x] = 3;
//       } else if (coursor < 69.6) {
//         newMatrix[y][x] = 4;
//       } else if (coursor < 70) {
//         newMatrix[y][x] = 5;
//       } else {
//         newMatrix[y][x] = 0;
//       }
//     }
//   }
//   return newMatrix;
// }

// let weatherTimer = 15;

// function weatherChanger() {
//   while (0 < weatherTimer) {
//     weatherTimer--;
//     return;
//   }
//   if (seasonsId >= seasons.length - 1) {
//     seasonsId = 0;
//     weather = seasons[seasonsId];
//     console.log(weather);
//   } else {
//     seasonsId++;
//     weather = seasons[seasonsId];
//     console.log(weather);
//   }
//   weatherTimer = 15;
// }

// function seasonColor(summerColor, fallColor, winterColor, springColor) {
//   if (weather == "Summer") {
//     fill(summerColor);
//   } else if (weather == "Fall") {
//     fill(fallColor);
//   } else if (weather == "Winter") {
//     fill(winterColor);
//   } else {
//     fill(springColor);
//   }
// }

// function restartGame() {
//   creatureCount.grass = 0;
//   creatureCount.grassEater = 0;
//   creatureCount.predator = 0;
//   creatureCount.farmer = 0;
//   creatureCount.zombie = 0;
//   weather = seasons[0];
//   weatherTimer = 15;
//   matrix = createMatrix(horizontallength, verticallength);
//   objectsMatrix = createObjectsMatrix(matrix);
// }

// function killAll(objectsMatrix) {
//   for (var y = 0; y < objectsMatrix.length; y++) {
//     for (let x = 0; x < objectsMatrix[y].length; x++) {
//       const object = objectsMatrix[y][x];
//       if (object) {
//         object.energy = -1;
//       }
//     }
//   }
// }

// function statUpdater(creatureCount) {
//   if(frameCount % 60 == 0) console.log(creatureCount);
//   frameCount = 0;
// }


// // Button Functions
// restartBtn.addEventListener("click", () => {
//   restartGame();
// });

// nextSeason.addEventListener("click", () => {
//   weatherTimer = 0;
// });
// killCreatures.addEventListener("click", () => {
//   killAll(objectsMatrix);
// });
