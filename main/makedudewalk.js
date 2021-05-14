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
const bulletTotal = 0;


let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let keyPresses = {};
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;

let img = new Image();
let imgMushroom = new Image();
let imgExplosion = new Image();

//explosion variables
let numExpColumns = 12;
let widthExplosion = 1152;
let explosionFrame = 0;
let currentExplosionFrame = 0;

let player1 = new Player(2.5, 2, 0,0);
let player2 = new Player(2.5, 2, 550,550);
width = 1300,
height = 700,

//arrays to store game element objects
bullets = [];
mushrooms = [];

function Mushroom(xLocation, yLocation){
  this.xLocation = xLocation;
  this.yLocation = yLocation;
}

function Player(scale,movementSpeed,startingPositionX,startingPositionY) {
  this.scale = scale;
  this.movementSpeed = movementSpeed;
  this.positionX = startingPositionX;
  this.positionY = startingPositionY;
  this.currentLoopIndex = 0;
  this.hasMoved = false;
  this.currentDirection = FACING_DOWN;
  this.alive = true;
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

function loadImages() {
  img.src = 'MainGuySpriteSheet.png';
  imgMushroom.src = 'mush.png'
  imgExplosion.src = 'Explosion.png'
  img.onload = function() {
    window.requestAnimationFrame(gameLoop);
  };
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(img,
                frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
                canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
}

loadImages();

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player1.hasMoved = false;
  player2.hasMoved = false;
  

  if (keyPresses.ArrowUp) { //up arrow
    //moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    moveCharacter(0, -player1.movementSpeed, FACING_UP, player1);
    player1.hasMoved = true;
  } else if (keyPresses.ArrowDown) { //down arrow
    //moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    moveCharacter(0, player1.movementSpeed, FACING_DOWN, player1);
    player1.hasMoved = true;
  }

  if (keyPresses['8']) { //up arrow
    //moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    moveCharacter(0, -player2.movementSpeed, FACING_UP, player2);
    player2.hasMoved = true;
  } else if (keyPresses['2']) { //down arrow
    //moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    moveCharacter(0, player2.movementSpeed, FACING_DOWN, player2);
    player2.hasMoved = true;
  }



  if (keyPresses.ArrowLeft) {
    //moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    moveCharacter(-player1.movementSpeed, 0, FACING_LEFT, player1);
    player1.hasMoved = true;
  } else if (keyPresses.ArrowRight) {
    //moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    moveCharacter(player1.movementSpeed, 0, FACING_RIGHT,player1);
    player1.hasMoved = true;
  }

  if (keyPresses['4']) {
    //moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    moveCharacter(-player2.movementSpeed, 0, FACING_LEFT,player2);
    player2.hasMoved = true;
  } else if (keyPresses['6']) {
    //moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    moveCharacter(player2.movementSpeed, 0, FACING_RIGHT,player2);
    player2.hasMoved = true;
  }

  if (player1.hasMoved || player2.hasMoved ) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      if(player1.hasMoved ){
        player1.currentLoopIndex++;
        if (player1.currentLoopIndex >= CYCLE_LOOP.length) {
          player1.currentLoopIndex = 0;
        }
      }
      if(player2.hasMoved ){
        player2.currentLoopIndex++;
        if (player2.currentLoopIndex >= CYCLE_LOOP.length) {
          player2.currentLoopIndex = 0;
        }
      }
      
    }
  }
  
  if (!player1.hasMoved ) {
    player1.currentLoopIndex = 0;
  }

  if (!player2.hasMoved ) {
    player2.currentLoopIndex = 0;
  }

  // code for bullet
  if (keyPresses[' ']&& bullets.length < 1) {
    //if (keyPresses[' ']) {
    let b = {
     //x: player_x + player_w/2, y: player_y + player_h/2, speedX: 0, speedY: 0, width: 20, height: 20
     x: player1.positionX + WIDTH/2 + 17, y: player1.positionY + HEIGHT/2, speedX: 0, speedY: 0, width: 20, height: 20
    };
    //b.x += WIDTH;
     //b.speedX += 20;
     //b.height = 5;
    
    if(player1.currentDirection == FACING_RIGHT) {
      b.x += WIDTH/2 - 10;
      b.speedX += 20;
      b.height = 5;
    }  
    else if(player1.currentDirection == FACING_UP) {
     b.y -= 10;
     b.speedY -= 20;
     b.width = 5;
    }
    else if(player1.currentDirection == FACING_DOWN && b.speedY === 0) {
     //b.y += 10;
     b.speedY += 20;
     b.width = 5;
    }
    else if(b.speedX === 0 && (player1.currentDirection == FACING_LEFT  || b.speedY === 0)) {
     b.x -= WIDTH/2;
     b.speedX -= 20;
     b.height = 5;
    }
    
    bullets.push(b);
  }
 

  movebullet()
  if(player1.alive){
    drawFrame(CYCLE_LOOP[player1.currentLoopIndex], player1.currentDirection, player1.positionX, player1.positionY);
  }else{
    
    if(!player1.exploded){
      ctx.drawImage(imgExplosion, (currentExplosionFrame)*96,0, 96, 96, player1.positionX,player1.positionY,96,96);
      if((String(explosionFrame).substr(String(explosionFrame).length - 1)) == '0'){
        console.log('here evcer ' + String(explosionFrame))
      
      currentExplosionFrame ++;
      }


      explosionFrame ++;
      if(currentExplosionFrame  > numExpColumns){
        player1.exploded = true;
        explosionFrame = 0;
        currentExplosionFrame = 0;
      }
    }
      
  }
  if(player2.alive){
    
    drawFrame(CYCLE_LOOP[player2.currentLoopIndex], player2.currentDirection, player2.positionX, player2.positionY);
  }

  //draw the mushrooms
  for (var i = 0; i < mushrooms.length; i++) {
    ctx.drawImage(imgMushroom, mushrooms[i].xLocation, mushrooms[i].yLocation,22,22);

  }
  

  drawbullet()
  window.requestAnimationFrame(gameLoop);
}


function moveCharacter(deltaX, deltaY, direction, thePlayer) {

  if (thePlayer.positionX + deltaX > 0 && thePlayer.positionX + SCALED_WIDTH + deltaX < canvas.width) {
    console.log('down x')
    thePlayer.positionX += deltaX;

  }
  if (thePlayer.positionY + deltaY > 0 && thePlayer.positionY + SCALED_HEIGHT + deltaY < canvas.height) {
    thePlayer.positionY += deltaY;
  }
  thePlayer.currentDirection = direction;
}

function drawbullet() {
  
  for (var i = 0; i < bullets.length; i++) {
   ctx.fillStyle = '#f00';
   ctx.fillRect(bullets[i].x,bullets[i].y,bullets[i].width,bullets[i].height)
  }
}

function eliminatePlayer(playerNumber){
  if(playerNumber == 1){
    player1.alive = false
  }else{
    player2.alive = false
  }
}

function movebullet() {
  const pixelsFromEdge = 22;
  if(bullets){
    for (var i = 0; i < bullets.length; i++) {
      bullets[i].x += bullets[i].speedX;
      bullets[i].y += bullets[i].speedY;
      let tempx
      let tempy
      if(bullets[i].x < 0 || bullets[i].x > width ||
        bullets[i].y < 0 || bullets[i].y > height){
        //bullet has got to end of screen 
        //drop a mushroom location
        if(bullets[i].x < 0){
          tempx = 0
          tempy = bullets[i].y 
        }else 
        if(bullets[i].x > width) {
          tempx = width - pixelsFromEdge
          tempy = bullets[i].y 
        }else
        if(bullets[i].y < 0 ) {
          tempx = bullets[i].x 
          tempy = 0
        }else
        if(bullets[i].y > height) {
          tempx = bullets[i].x 
          tempy = height-pixelsFromEdge
        }

        mushrooms.push(new Mushroom(tempx,tempy))

        bullets.splice(i, 1);
        
        
      }
    }
  }
}