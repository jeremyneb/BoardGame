//Canvas
var canvas = document.getElementById("gameBoard");
var cx = canvas.getContext("2d");

//Board size - Intended to be dynamic
var boardWidth = 10;
var boardHeight = 10;
var cellSize = 64;

//Map code
var defaultCode = 0;
var playerCode = 1;
var goalCode = 2;
var enemyCode = 3;

//Image array
var images = [];
function load() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = load.arguments[i];
    }
}
load(
    "images/rect-temp.png",
    "images/rect-temp-enemy.png",
    "images/rect-temp-goal.png",
    "images/rect-temp-player.png"
)

//Object vars
var board;
var player;
var enemy;
var goal;

//Setup board
var board = new Array(boardWidth);
for (var i = 0; i < boardWidth; i++) {
  board[i] = new Array(boardHeight);
}

//Fill with zeros
for (var i = 0; i < boardWidth; i++) {
  for (var j = 0; j < boardHeight; j++) {
      board[i][j] = defaultCode;
  }
}

//Set player position and goal
board[0][boardHeight-1] = playerCode;
board[boardWidth-1][0] = goalCode;

//Generate enemy positions randomly
var randX, randY;
for (numEnemy = 0; numEnemy < 8; numEnemy++) {
  randX = Math.floor(Math.random()*10);
  randY = Math.floor(Math.random()*10);

  //Check if an empty tile, if not, try again until empty
  if (board[randX][randY] == 0) {
    board[randX][randY] = 3;
  } else {
    numEnemy--;
  }
}

//Using jQuery, wait to load images to screen
$(function() {
  for (var i = 0; i < boardWidth; i++) {
    for (var j = 0; j < boardHeight; j++) {
      if (board[i][j] == 0) {
        cx.drawImage(images[0], i*cellSize, j*cellSize);
      }
      else if (board[i][j] == 1) {
        cx.drawImage(images[3], i*cellSize, j*cellSize);
      }
      else if (board[i][j] == 2) {
        cx.drawImage(images[2], i*cellSize, j*cellSize);
      }
      else if (board[i][j] == 3) {
        cx.drawImage(images[1], i*cellSize, j*cellSize);
      }
    }
  }
});
