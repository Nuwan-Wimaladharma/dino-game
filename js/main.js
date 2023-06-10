const divElm = document.createElement('div');
divElm.classList.add('box');
document.body.append(divElm);
divElm.style.top = `${innerHeight - 250}px`;

const backgroundMusic = new Audio('audio/background-music.mp3');
const ateFoodMusic = new Audio('audio/ate-food-music.mp3');
const diedMusic = new Audio('audio/died-music.mp3');
function playMusic(){
    backgroundMusic.play();
}

const divFoodElm = document.createElement('div');
divFoodElm.classList.add('food');

const divAerolightElm = document.createElement('div');
divAerolightElm.classList.add('aero');

const divScoreElm = document.createElement('div');
divScoreElm.classList.add('score');
document.body.append(divScoreElm);
divScoreElm.innerText = 'SCORE: 0';

const divGameOverContainerElm = document.createElement('div');
divGameOverContainerElm.classList.add('go-container');
document.body.append(divGameOverContainerElm);

const selectContainer = document.querySelector('.go-container');

const divGameOverElm = document.createElement('div');
divGameOverElm.classList.add('game-over');
divGameOverContainerElm.append(divGameOverElm);
divGameOverElm.innerText = 'GAME OVER';

const btnRefresh = document.createElement('button');
btnRefresh.classList.add('refresh');
divGameOverContainerElm.append(btnRefresh);
btnRefresh.innerText = 'PLAY AGAIN';

btnRefresh.addEventListener('click', () => {
    document.location.reload();
});

const divControls = document.createElement('div');
divControls.classList.add('control-container');
document.body.append(divControls);

const divSpace = document.createElement('div');
divSpace.classList.add('controls');
divSpace.innerText = 'Space key - To jump';

const divMove = document.createElement('div');
divMove.classList.add('controls');
divMove.innerText = 'Arrow keys - To move left & right'

divControls.append(divSpace);
divControls.append(divMove);

let score = 0;

let jump = false;
let runRight = false;
let runLeft = false;
let towardRight = false;
let towardLeft = false;
let ateFood = true;
let dead = false;

let xFood = 0;
let yFood = 0;

let xAerolight = 0;
let yAerolight = 0;

let tmrActionInterval = null;
let tmrSpriteInterval = null;
let tmrAerolightInterval = null;

let dx = 0;

document.addEventListener('keypress',(eventData) => {
    if(eventData.key === ' '){
        backgroundMusic.play();
        jump = true;
    } 
});

document.body.addEventListener('keydown', (eventData)=> {
    if (eventData.code === ' '){
        backgroundMusic.play();
        jump = true;
    }else if (eventData.code === 'ArrowRight'){
        backgroundMusic.play();
        runRight = true;
        towardRight = true;
        towardLeft = false;
        dx = 2;
    }else if (eventData.code === 'ArrowLeft'){
        backgroundMusic.play();
        runLeft = true;
        towardLeft = true;
        towardRight = false;
        dx = -2;
    }
});

document.body.addEventListener('keyup', (eventData) => {
    if (eventData.code === 'ArrowRight'){
        runRight = false;
        dx = 0;
    }else if (eventData.code === 'ArrowLeft'){
        runLeft = false;
        dx = 0;
    }
});

function stayIdle(){
    let animalHeadX = divElm.offsetLeft + 125;
    let animalHeadY = divElm.offsetTop + 20;

    let foodSetX = (animalHeadX >= (xFood - 40)) && (animalHeadX <= xFood + 40);
    let foodSetY = (animalHeadY <= (yFood + 40)) && (animalHeadY >= (yFood - 40));

    let deadSetX = (animalHeadX >= (xAerolight - 40)) && (animalHeadX <= xAerolight + 40);
    let deadSetY = (animalHeadY <= (yAerolight + 40)) && (animalHeadY >= (yAerolight - 40));

    if(foodSetX && foodSetY){
        ateFoodMusic.play();
        divScoreElm.innerText = `SCORE: ${score}`;
        ateFood = true;
    }
    if(deadSetX && deadSetY){
        dead = true;
        diedMusic.play();
        backgroundMusic.pause();
    }
}

let angle =  0;
function doJump(){
    let y = Math.cos(angle * (Math.PI / 180));
    y *= 3;
    divElm.style.top = (divElm.offsetTop - y) + "px";

    angle ++;
    if(angle > 180){
        jump = false;
        angle = 0;
    }

    let animalHeadX = divElm.offsetLeft + 125;
    let animalHeadY = divElm.offsetTop + 20;

    let foodSetX = (animalHeadX >= (xFood - 40)) && (animalHeadX <= xFood + 40);
    let foodSetY = (animalHeadY <= (yFood + 40)) && (animalHeadY >= (yFood - 40));

    let deadSetX = (animalHeadX >= (xAerolight - 40)) && (animalHeadX <= xAerolight + 40);
    let deadSetY = (animalHeadY <= (yAerolight + 40)) && (animalHeadY >= (yAerolight - 40));

    if(foodSetX && foodSetY){
        ateFoodMusic.play();
        divScoreElm.innerText = `SCORE: ${score}`;
        ateFood = true;
    }
    if(deadSetX && deadSetY){
        dead = true;
        diedMusic.play();
        backgroundMusic.pause();
    }
}
function doRun(){
    let x = divElm.offsetLeft + dx;
    if ((x + divElm.offsetWidth)> innerWidth) {
        x = innerWidth - divElm.offsetWidth;
    }else if (x <= 0) x = 0;
    divElm.style.left = `${x}px`;

    let animalHeadX = divElm.offsetLeft + 125;
    let animalHeadY = divElm.offsetTop + 20;

    let foodSetX = (animalHeadX >= (xFood - 40)) && (animalHeadX <= xFood + 40);
    let foodSetY = (animalHeadY <= (yFood + 40)) && (animalHeadY >= (yFood - 40));

    let deadSetX = (animalHeadX >= (xAerolight - 40)) && (animalHeadX <= xAerolight + 40);
    let deadSetY = (animalHeadY <= (yAerolight + 40)) && (animalHeadY >= (yAerolight - 40));

    if(foodSetX && foodSetY){
        ateFoodMusic.play();
        divScoreElm.innerText = `SCORE: ${score}`;
        ateFood = true;
    }
    if(deadSetX && deadSetY){
        dead = true;
        diedMusic.play();
        backgroundMusic.pause();
    }
}
function makeFood(){
    let foodX = 250 + Math.round(Math.random() * (innerWidth - 500));
    let foodY = (0 + innerHeight -250) - Math.round(Math.random() * 150);
    xFood = foodX;
    yFood = foodY;
    document.body.append(divFoodElm);
    divFoodElm.style.top = foodY + "px";
    divFoodElm.style.left = foodX + "px";
}
let aeroLiteY = 0;
let aeroLiteX = 250 + Math.round(Math.random() * (innerWidth - 500));
function makeAerolite(){
    xAerolight = aeroLiteX;
    yAerolight = aeroLiteY;
    document.body.append(divAerolightElm);
    divAerolightElm.style.top = aeroLiteY + "px";
    divAerolightElm.style.left = aeroLiteX + "px";
    aeroLiteY += 5;

    if(aeroLiteY >= (innerHeight - 125)){
        aeroLiteY = 0;
        aeroLiteX = 250 + Math.round(Math.random() * (innerWidth - 500));
    }
}

let i = 1;
function drawIdleRight(){
    divElm.style.backgroundImage = `url('img/Idle (${i++}).png')`;
    if(i === 11) i = 1;
}
let m = 1;
function drawIdleLeft(){
    divElm.style.backgroundImage = `url('img/IdleLeft (${m++}).png')`;
    if(m === 11) m = 1;
}

let j = 1;
function drawJumpRight(){
    divElm.style.backgroundImage = `url('img/Jump (${j++}).png')`;
    if(j === 13) j = 1;
}
let n = 1;
function drawJumpLeft(){
    divElm.style.backgroundImage = `url('img/JumpLeft (${n++}).png')`;
    if(n === 13) n = 1;
}
let k = 1;
function drawRunRight(){
    divElm.style.backgroundImage = `url('img/Run (${k++}).png')`;
    if(k === 9) k = 1;
}
let l = 1;
function drawRunLeft(){
    divElm.style.backgroundImage = `url('img/RunLeft (${l++}).png')`;
    if(l === 9) l = 1;
}
let o = 1;
function deadRunRight(){
    divElm.style.backgroundImage = `url('img/Dead (${o++}).png')`;
    if(o === 9) o = 1;
}
let p = 1;
function deadRunLeft(){
    divElm.style.backgroundImage = `url('img/DeadLeft (${p++}).png')`;
    if(p === 9) p = 1;
}

tmrActionInterval = setInterval(() => {
    if(jump){
        doJump();
    }
    if (runRight || runLeft){
        doRun();
    }
    if((!jump && !runRight) && (!jump && !runLeft)){
        stayIdle();
    }
},5);

tmrSpriteInterval = setInterval(() => {
    if(!jump && !runRight && !runLeft && !towardRight && !towardLeft){
        drawIdleRight();
    }
    if(towardRight){
        drawIdleRight();
    }
    if(towardLeft){
        drawIdleLeft();
    }
    if(jump){
        drawJumpRight();
    }
    if(towardRight && jump){
        drawJumpRight();
    }
    if(towardLeft && jump){
        drawJumpLeft();
    }
    if(jump && runRight){
        drawJumpRight();
    }
    if(jump && runLeft){
        drawJumpLeft(); 
    }
    if(runRight){
        drawRunRight();
    }
    if(runLeft){
        drawRunLeft();
    }
    if(ateFood){
        score += 10;
        makeFood();
        ateFood = false;
    }
    if(dead && towardRight){
        deadRunRight();
        dead = false;
        jump = false;
        runRight = false;
        runLeft = false;
        divElm.style.backgroundImage = `url('img/Dead (${8}).png')`;
        divElm.style.width = '350px';
        divElm.style.top = `${innerHeight - 250}px`;
        divGameOverContainerElm.style.visibility = 'visible';
        clearInterval(tmrActionInterval);
        clearInterval(tmrSpriteInterval);
        clearInterval(tmrAerolightInterval);
        tmrActionInterval = null;
        tmrSpriteInterval = null;
        tmrAerolightInterval = null;
    }
    if(dead && towardLeft){
        deadRunLeft();
        dead = false;
        jump = false;
        runRight = false;
        runLeft = false;
        divElm.style.backgroundImage = `url('img/DeadLeft (${8}).png')`;
        divElm.style.width = '350px';
        divElm.style.top = `${innerHeight - 250}px`;
        divGameOverContainerElm.style.visibility = 'visible';
        clearInterval(tmrActionInterval);
        clearInterval(tmrSpriteInterval);
        clearInterval(tmrAerolightInterval);
        tmrActionInterval = null;
        tmrSpriteInterval = null;
        tmrAerolightInterval = null;
    }
},50);
tmrAerolightInterval = setInterval(() => {
    makeAerolite();
},5);

