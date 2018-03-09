//Variable declaration
var images = [];
var canvas;
var cx;
var enemyArray;

//Board size, could be dynamic?
//Don't forget to adjust canvas size!
//Height=boardHeight*64
//Width=boardWidth*64
var boardWidth = 10;
var boardHeight = 10;
const cellSize = 64;

//Constants
const emptyTile = 0;
const playerTile = 1;
const enemyTile = 2;
const bossTile = 3;
const goalTile = 4;
const forestTile = 5;

//Objects
var board;
var player;
var enemy;
var boss;
var goal;

//Create canvas
canvas = document.getElementById('gameBoard');
if (canvas.getContext) {
  cx = canvas.getContext('2d');
}

//Load images into memory
load(
  "images/rect-temp.png",
  "images/rect-temp-player.png",
  "images/rect-temp-enemy.png",
  "images/rect-temp-boss.png",
  "images/rect-temp-goal.png",
  "images/rect-temp-forest.png",
  "images/rect-temp-mtn.png"
)

//Setup board
board = new Array(boardWidth);
for (var i = 0; i < boardWidth; i++) {
  board[i] = new Array(boardHeight);
}

//Setup static map - Note that coordinates are switched --> board[y][x]
//Possibly in future, read maps from file
//Or possibility to have randomly gernerated maps
board = [
  [0, 5, 0, 0, 0, 0, 5, 0, 0, 4],
  [0, 0, 5, 0, 0, 0, 0, 0, 0, 5],
  [0, 5, 0, 5, 6, 6, 6, 6, 6, 6],
  [0, 5, 0, 6, 6, 6, 6, 5, 6, 6],
  [6, 6, 0, 0, 5, 0, 0, 6, 5, 6],
  [6, 6, 6, 5, 0, 0, 0, 0, 6, 6],
  [6, 6, 6, 6, 0, 0, 0, 6, 6, 6],
  [5, 5, 6, 6, 6, 6, 5, 5, 6, 6],
  [5, 0, 0, 0, 0, 0, 0, 5, 5, 5],
  [0, 0, 0, 0, 0, 0, 0, 5, 5, 5]
];

//--------FUNCTIONS--------//

//Key Handler
//Simply create new cases for each tile check
//Ahead of time execution, events triggered before player moves
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 37 && player.xPos != 0) {
    switch (board[player.yPos][player.xPos - 1]) {
      case 2:
        fight(0);
        break;
      case 3:
        fight(1);
        break;
      case 6:
        pause();
        break;
    }
    player.xPos -= 1;
  } else if (event.keyCode == 38 && player.yPos != 0) {
    switch (board[player.yPos - 1][player.xPos]) {
      case 2:
        fight(0);
        break;
      case 3:
        fight(1);
        break;
      case 6:
        pause();
        break;
    }
    player.yPos -= 1;
  } else if (event.keyCode == 39 && player.xPos != boardWidth - 1) {
    switch (board[player.yPos][player.xPos + 1]) {
      case 2:
        fight(0);
        break;
      case 3:
        fight(1);
        break;
      case 6:
        pause();
        break;
    }
    player.xPos += 1;
  } else if (event.keyCode == 40 && player.yPos != boardHeight - 1) {
    switch (board[player.yPos + 1][player.xPos]) {
      case 2:
        fight(0);
        break;
      case 3:
        fight(1);
        break;
      case 6:
        pause();
        break;
    }
    player.yPos += 1;
  }
  render();
});

//Image array - refer to line 37 for indexes
function load() {
  for (var i = 0; i < arguments.length; i++) {
    images[i] = new Image();
    images[i].src = load.arguments[i];
  }
}

//Determines which fight to execute
function fight(enemy) {
  if (enemy == 0) {
    //Fight basic enemy
    console.log("Fighting basic");
  } else if (enemy == 1) {
    //Fight boss
    console.log("Fighting boss");
  }
}

//Generate enemy positions randomly in valid positions
function generateEnemies() {
  var randX, randY;
  for (numEnemy = 0; numEnemy < 8; numEnemy++) {
    randX = Math.floor(Math.random() * 10);
    randY = Math.floor(Math.random() * 10);

    //Check if an empty tile, if not, try again until empty
    if (board[randX][randY] == 0) {
      board[randX][randY] = enemyTile;
    } else {
      numEnemy--;
    }
  }
}

/**
0-empty
1-player
2-enemy
3-boss
4-goal
5-forest
6-mountain
**/

//Render sprites on screen
function render() {
  cx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (board[j][i] == 0) {
        cx.drawImage(images[0], i * cellSize, j * cellSize);
      } else if (board[j][i] == 1) {
        cx.drawImage(images[1], i * cellSize, j * cellSize);
      } else if (board[j][i] == 2) {
        cx.drawImage(images[2], i * cellSize, j * cellSize);
      } else if (board[j][i] == 3) {
        cx.drawImage(images[3], i * cellSize, j * cellSize);
      } else if (board[j][i] == 4) {
        cx.drawImage(images[4], i * cellSize, j * cellSize);
      } else if (board[j][i] == 5) {
        cx.drawImage(images[5], i * cellSize, j * cellSize);
      } else if (board[j][i] == 6) {
        cx.drawImage(images[6], i * cellSize, j * cellSize);
      }
    }
  }
  cx.drawImage(images[1], player.xPos * cellSize, player.yPos * cellSize);
};

function pause() {
  //Emulate two turns passing by calling necessary functions
  //This will give the effect of the mountains taking longer
  //While only having to press arrows once to proceed
  //Consider using setTimeout?
}

//Initialize variables
function initialize() {
  goal = {
    xPos: boardWidth - 1,
    yPos: 0
  }

  player = {
    health: 6,
    gold: 0,
    rations: 10,
    damage: 1,
    xPos: 0,
    yPos: boardHeight - 1
  };

  enemy = {
    health: 2,
    gold: 2,
    rations: 2,
    damage: 2,
    xPos: 0,
    yPos: 0
  };

  boss = {
    health: 10,
    gold: 100,
    damage: 3,
    xPos: 0,
    yPos: 0
  };
}

//jQuery onload - Is called once page is finished loading
$(function() {
  initialize();
  generateEnemies();
  render();
});
