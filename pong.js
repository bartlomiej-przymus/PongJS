const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

let pongX = 300;
let pongY = 150;

let ll = 3;
let rl = 3;

let leftLives = document.getElementById('leftLives');
let rightLives = document.getElementById('rightLives');

let leftScore = document.getElementById('leftScore');
let rightScore = document.getElementById('rightScore');
let roundCounter = document.getElementById('roundCounter');

window.requestAnimationFrame(mainLoop);
    
function decrementLeftLives() {
    ll = parseInt(leftLives.innerText);
    ll--;
    leftLives.innerText = ll;
}

function decrementRightLives() {
    rl = parseInt(rightLives.innerText);
    rl--;
    rightLives.innerText = rl;
}


function incrementLeftScore() {
    let lScore = parseInt(leftScore.innerText);
    if(lScore < 10) {
        lScore++;
        leftScore.innerText = '0'+lScore;
    } else {
        lScore++;
        leftScore.innerText = lScore;
    }
};

function incrementRightScore() {
    let rScore = parseInt(rightScore.innerText);
    if(rScore < 10) {
        rScore++;
        rightScore.innerText = '0'+rScore;
    } else {
        rScore++;
        rightScore.innerText = rScore;
    }
};

function incrementRoundNumber() {
    let roundNum = parseInt(roundCounter.innerText);
    if(roundNum < 10) {
        roundNum++;
        roundCounter.innerText = '0'+roundNum;
    } else {
        roundNum++;
        roundCounter.innerText = roundNum;
    }
    if((roundNum % 5) == 0){
        dirX++;
        dirY++;
    }
}

function message(message){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = "30px Orbitron";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(message, canvas.width/2, canvas.height/2);
    ctx.fillText('Press Enter to restart', canvas.width/2, canvas.height-30);
}

function gameReset(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    leftLives.innerText = 3;
    ll = 3;
    rightLives.innerText = 3;
    rl = 3;
    leftScore.innerText = '00';
    rightScore.innerText = '00';
    roundCounter.innerText = '00';
    pongX = 300;
    pongY = 150;
    padLX = 0;
    padLY = 110;
    padRX = 590;
    padRY = 110;
    gameStarted = false;
    gameFinished = false;
}

function wallHit() {
    gameStarted = false;
    ctx.fillStyle = 'red';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    pongX = 300;
    pongY = 150;
    dirX = -dirX;
    padLX = 0;
    padLY = 110;
    padRX = 590;
    padRY = 110;
    incrementRoundNumber();
    if(parseInt(leftLives.innerText) == 0){
        message('Game Over - Player 2 Wins!')
        gameFinished = true;
    }else if(parseInt(rightLives.innerText) == 0){
        message('Game Over - Player 1 Wins!')
        gameFinished = true;
    }
}

    let dirX = 5;
    let dirY = 5;

    let pX = 0;
    let pY = 0;

function movePong() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    pongX = pongX + dirX;
    pongY = pongY + dirY;

    if(pongX < 0 || pongX > 590) {
        dirX = -dirX;
    }
   
    if(pongY < 0 || pongY > 290) {
        dirY = -dirY;
    }

    //Collision detection

    if((pongX == padLX + 10)&&(pongY >= padLY)&&(pongY <= padLY + 70)){
        dirX = -dirX;
    }

    if((pongX == padRX - 10)&&(pongY >= padRY)&&(pongY <= padRY + 70)){
        dirX = -dirX;
    }

    ctx.fillStyle = 'white';
    ctx.fillRect(pongX, pongY,10,10);

    //wall collision detection

    if(pongX == 0){
        incrementRightScore();
        decrementLeftLives();
        wallHit();
    }
    if(pongX == 590){
        incrementLeftScore();
        decrementRightLives();
        wallHit();
    }
}

    let padLX = 0;
    let padLY = 110;

function leftPad() {
    ctx.fillStyle = 'white';
    ctx.fillRect(padLX,padLY,10,70);
}

    let padRX = 590;
    let padRY = 110;

function rightPad() {
    ctx.fillStyle = 'white';
    ctx.fillRect(padRX,padRY,10,70);
}

let leftPadKeyUp    = false;
let leftPadKeyDown  = false;
let rightPadKeyUp   = false;
let rightPadKeyDown = false;

let gameStarted = false;
let gameFinished = false;

function whichKeyIsDown(event) {
    if(event.keyCode == '65') { // a key
        leftPadKeyUp = true;
    }else if(event.keyCode == '90') { // z key
        leftPadKeyDown = true;
    }
    if(event.keyCode == '38') { // up arrow key
        rightPadKeyUp = true;
    }else if(event.keyCode == '40') { // down arrow key
        rightPadKeyDown = true;
    }
    if(event.keyCode == '32') { //space key
        if(!gameFinished){
        if(gameStarted) {
            gameStarted = false;
        }else{
            gameStarted = true;
        }}
    }
    if(event.keyCode == '13') { //press n for new game
        gameReset();
    }
}

function whichKeyIsUp(event) {
    if(event.keyCode == '65') {
        leftPadKeyUp = false;
    }else if(event.keyCode == '90') {
        leftPadKeyDown = false;
    }
    if(event.keyCode == '38') {
        rightPadKeyUp = false;
    }else if(event.keyCode == '40') {
        rightPadKeyDown = false;
    }
}

function movePads() {
    if (leftPadKeyUp && padLY >= 10) {
        padLY -=10;
    }
    if (leftPadKeyDown && padLY <= 240) {
        padLY +=10;
    }
    if (rightPadKeyUp && padRY >= 10) {
        padRY -=10;
    }
    if (rightPadKeyDown && padRY <= 240) {
        padRY +=10;
    }
}

document.addEventListener('keydown', whichKeyIsDown, false);
document.addEventListener('keyup', whichKeyIsUp, false);

function mainLoop(){
    if(gameStarted){
        movePong();
        movePads();
    }

    leftPad();
    rightPad();
    
    window.requestAnimationFrame(mainLoop);
}
