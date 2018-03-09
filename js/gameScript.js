//Key Handler
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37 && player.xPos != 0) {
      player.xPos -= 1;
    }
    else if(event.keyCode == 38 && player.yPos != 0) {
      player.yPos -= 1;
    }
    else if(event.keyCode == 39 && player.xPos != boardWidth - 1) {
      player.xPos += 1;
    }
    else if(event.keyCode == 40 && player.yPos != boardHeight - 1) {
      player.yPos += 1;
    }
    render();
});

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
  "images/rect-temp-player.png",
  "images/rect-temp-goal.png",
  "images/rect-temp-enemy.png",
  "images/rect-temp-forest.png",
  "images/rect-temp-boss.png",
  "images/rect-temp-mtn.png"
)

var canvas = document.getElementById('gameBoard');
if (canvas.getContext) {
  var cx = canvas.getContext('2d');
}

//Board size - Could be dynamic
var boardWidth = 10;
var boardHeight = 10;
const cellSize = 64;

//Map code
const emptyTile = 0;
const playerTile = 1;
const goalTile = 2;
const enemyTile = 3;
const forestTile = 4;
const bossTile = 5;

//Object vars
var board;
var player;
var enemy;
var boss;
var goal;

goal = {
  xPos : boardWidth - 1,
  yPos : 0
}

player = {
  health : 6,
  gold : 0,
  rations : 10,
  damage : 1,
  xPos : 0,
  yPos : boardHeight - 1
};

enemy = {
  health : 2,
  gold : 2,
  rations : 2,
  damage : 2,
  xPos : 0,
  yPos : 0
};

boss = {
  health : 10,
  gold : 100,
  damage : 3,
  xPos : 0,
  yPos : 0
};

//Setup board
board = new Array(boardWidth);
for (var i = 0; i < boardWidth; i++) {
  board[i] = new Array(boardHeight);
}

//Setup static map
board = [[0,4,0,0,0,0,4,0,0,0],
        [0,0,4,0,0,0,0,0,0,4],
        [0,4,0,4,10,10,10,10,10,10],
        [0,4,0,10,10,10,10,4,10,10],
        [10,10,0,0,4,0,0,6,4,10],
        [10,10,10,4,0,0,0,0,10,10],
        [10,10,10,10,0,0,0,10,10,10],
        [4,4,10,10,10,10,4,4,10,10],
        [4,0,0,0,0,0,0,4,4,4],
        [0,0,0,0,0,0,0,4,4,4]];

//Set player position and goal
board[boardHeight-1][0] = playerTile;
board[0][boardWidth-1] = goalTile;

//Generate enemy positions randomly
function generateEnemies() {
  var randX, randY;
  for (numEnemy = 0; numEnemy < 8; numEnemy++) {
    randX = Math.floor(Math.random()*10);
    randY = Math.floor(Math.random()*10);
    console.log(board[randX][randY]);

    //Check if an empty tile, if not, try again until empty
    if (board[randX][randY] == 0) {
      board[randX][randY] = enemyTile;
    } else {
      numEnemy--;
    }
  }
}

function render() {
  cx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (board[j][i] == 0) {
        cx.drawImage(images[0], i*cellSize, j*cellSize);
      } else if (board[j][i] == 2) {
        cx.drawImage(images[2], i*cellSize, j*cellSize);
      } else if (board[j][i] == 3) {
        cx.drawImage(images[3], i*cellSize, j*cellSize);
      } else if (board[j][i] == 4) {
        cx.drawImage(images[4], i*cellSize, j*cellSize);
      } else if (board[j][i] == 10) {
        cx.drawImage(images[6], i*cellSize, j*cellSize);
      }
    }
  }
  cx.drawImage(images[1], player.xPos*cellSize, player.yPos*cellSize);
};

//Using jQuery, wait to load images to screen
$(function() {
  generateEnemies();
  render();
});
