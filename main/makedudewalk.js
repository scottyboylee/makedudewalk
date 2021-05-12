const SCALE = 2.5;
const WIDTH = 45;
const HEIGHT = 36;
const SCALED_WIDTH = SCALE * WIDTH;
const SCALED_HEIGHT = SCALE * HEIGHT;
const CYCLE_LOOP = [0, 1, 0, 2];
const FACING_DOWN = 0;
const FACING_UP = 2;
const FACING_LEFT = 3;
const FACING_RIGHT = 1;
const FRAME_LIMIT = 12;
const MOVEMENT_SPEED = 2;

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let keyPresses = {};
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;
let img = new Image();

let player1 = new Player(2.5, 2, 0,0);
let player2 = new Player(2.5, 2, 550,550);


function Player(scale,movementSpeed,startingPositionX,startingPositionY) {
  this.scale = scale;
  this.movementSpeed = movementSpeed;
  this.positionX = startingPositionX;
  this.positionY = startingPositionY;
}


window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
    console.log(event.key)
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

function loadImage() {
  console.log('im here');
  img.src = 'MainGuySpriteSheet.png';
  img.onload = function() {
    window.requestAnimationFrame(gameLoop);
  };
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(img,
                frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
                canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
}

loadImage();

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let hasMoved = false;
  

  if (keyPresses.ArrowUp) { //up arrow
    //moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    moveCharacter(0, -player1.movementSpeed, FACING_UP, player1);
    hasMoved = true;
  } else if (keyPresses.ArrowDown) { //down arrow
    //moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    moveCharacter(0, player1.movementSpeed, FACING_DOWN, player1);
    hasMoved = true;
  }

  if (keyPresses['8']) { //up arrow
    //moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    moveCharacter(0, -player2.movementSpeed, FACING_UP, player2);
    hasMoved = true;
  } else if (keyPresses['2']) { //down arrow
    //moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    moveCharacter(0, player2.movementSpeed, FACING_DOWN, player2);
    hasMoved = true;
  }



  if (keyPresses.ArrowLeft) {
    //moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    moveCharacter(-player1.movementSpeed, 0, FACING_LEFT, player1);
    hasMoved = true;
  } else if (keyPresses.ArrowRight) {
    //moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    moveCharacter(player1.movementSpeed, 0, FACING_RIGHT,player1);
    hasMoved = true;
  }

  if (keyPresses['4']) {
    //moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    moveCharacter(-player2.movementSpeed, 0, FACING_LEFT,player2);
    hasMoved = true;
  } else if (keyPresses['6']) {
    //moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    moveCharacter(player2.movementSpeed, 0, FACING_RIGHT,player2);
    hasMoved = true;
  }

  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  }
  
  if (!hasMoved) {
    currentLoopIndex = 0;
  }

  drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, player1.positionX, player1.positionY);
  drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, player2.positionX, player2.positionY);
  window.requestAnimationFrame(gameLoop);
}

/*
function moveCharacter(deltaX, deltaY, direction) {
  if (positionX + deltaX > 0 && positionX + SCALED_WIDTH + deltaX < canvas.width) {
    positionX += deltaX;
  }
  if (positionY + deltaY > 0 && positionY + SCALED_HEIGHT + deltaY < canvas.height) {
    positionY += deltaY;
  }
  currentDirection = direction;
}
*/
/*
function moveCharacter(deltaX, deltaY, direction) {
  console.log('im hre')
  console.log(player1.positionX )
  console.log(player1.positionY )
  if (player1.positionX + deltaX > 0 && player1.positionX + SCALED_WIDTH + deltaX < canvas.width) {
    console.log('down x')
    player1.positionX += deltaX;

  }
  if (player1.positionY + deltaY > 0 && player1.positionY + SCALED_HEIGHT + deltaY < canvas.height) {
    console.log('down y')
    player1.positionY += deltaY;
  }
  currentDirection = direction;
}
*/
function moveCharacter(deltaX, deltaY, direction, thePlayer) {
  console.log('im hre')
  console.log(thePlayer.positionX )
  console.log(thePlayer.positionY )
  if (thePlayer.positionX + deltaX > 0 && thePlayer.positionX + SCALED_WIDTH + deltaX < canvas.width) {
    console.log('down x')
    thePlayer.positionX += deltaX;

  }
  if (thePlayer.positionY + deltaY > 0 && thePlayer.positionY + SCALED_HEIGHT + deltaY < canvas.height) {
    console.log('down y')
    thePlayer.positionY += deltaY;
  }
  currentDirection = direction;
}