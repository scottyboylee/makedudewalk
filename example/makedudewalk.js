var canvas,
ctx,
width = 600,
height = 600,
rightKey = false,
leftKey = false,
upKey = false,
downKey = false,
player,
player_x = (width / 2) - 25, player_y = height - 75, player_w = 50, player_h = 50,
            bulletTotal = 2,
bullet = [];



function clearCanvas() {
ctx.clearRect(0,0,width,height);
}



function drawplayer() {
if (rightKey) player_x += 5;
else if (leftKey) player_x -= 5;
if (upKey) player_y -= 5;
else if (downKey) player_y += 5;
if (player_x <= 0) player_x = 0;
if ((player_x + player_w) >= width) player_x = width - player_w;
if (player_y <= 0) player_y = 0;
if ((player_y + player_h) >= height) player_y = height - player_h;


ctx.fillStyle = "red";
ctx.fillRect(player_x, player_y, player_w, player_h);  
}


function drawbullet() {
if (bullet.length)
for (var i = 0; i < bullet.length; i++) {
 ctx.fillStyle = '#f00';
 ctx.fillRect(bullet[i].x,bullet[i].y,bullet[i].width,bullet[i].height)
}
}
function movebullet() {
for (var i = 0; i < bullet.length; i++) {
bullet[i].x += bullet[i].speedX;
bullet[i].y += bullet[i].speedY;
if(bullet[i].x < 0 || bullet[i].x > width ||
   bullet[i].y < 0 || bullet[i].y > height) bullet.splice(i, 1);
}
}

function init() {
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
setInterval(gameLoop, 25);
document.addEventListener('keydown', keyDown, false);
document.addEventListener('keyup', keyUp, false);
}
function gameLoop() {
clearCanvas();

movebullet();

drawplayer();
drawbullet();
}

function keyDown(e) {
if (e.keyCode == 39) rightKey = true;
else if (e.keyCode == 37) leftKey = true;
if (e.keyCode == 38) upKey = true;
else if (e.keyCode == 40) downKey = true;
if (e.keyCode == 32 && bullet.length <= bulletTotal) {
let b = {
 x: player_x + player_w/2, y: player_y + player_h/2, speedX: 0, speedY: 0, width: 20, height: 20
};
if(rightKey) {
 b.x += player_w;
 b.speedX += 20;
 b.height = 5;
}
if(upKey) {
 b.y -= player_h;
 b.speedY -= 20;
 b.width = 5;
}
if(downKey && b.speedY === 0) {
 b.y += player_h;
 b.speedY += 20;
 b.width = 5;
}
if(b.speedX === 0 && (leftKey || b.speedY === 0)) {
 b.x -= player_w;
 b.speedX -= 20;
 b.height = 5;
}
bullet.push(b);
}
}

function keyUp(e) {
if (e.keyCode == 39) rightKey = false;
else if (e.keyCode == 37) leftKey = false;
if (e.keyCode == 38) upKey = false;
else if (e.keyCode == 40) downKey = false;
}

//window.onload = init;
init();