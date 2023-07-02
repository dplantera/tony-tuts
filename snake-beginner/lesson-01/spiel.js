/***  @type {HTMLCanvasElement} */
const canvasHtmlElement = document.getElementById("spiel-brett");
/***  @type {CanvasRenderingContext2D} */
const zeichenKontext = canvasHtmlElement.getContext("2d")

const scoreElement = document.createElement('div');
const hudElement = document.createElement("div");
hudElement.appendChild(scoreElement);
document.body.appendChild(hudElement);

/**
 * ######################################
 * # spielbrett
 */
const maxW = canvasHtmlElement.clientWidth;
const maxH = canvasHtmlElement.clientHeight;
let score = 0;
function zeichneSpielBrett() {
    zeichneRechteck(0, 0, maxW, maxH, "black");
    zeichneRechteck(1, 1, maxW - 2, maxH - 2, "white");

}
function zeichneScore() {
    scoreElement.textContent = `score: ${score}`
}


/**
 * ######################################
 * # snake
 */
const snakeSize = 10;
let snakeX;
let snakeY;
/** @type {'HOCH' | 'RUNTER' | 'LINKS' | 'RECHTS'} */
let richtung = 'RECHTS';
function setzeSnake(){
    const pos = gibZufälligePosition(snakeSize);
    snakeX = pos.x;
    snakeY = pos.y;
}

function bewegeSnake() {
    if(richtung === 'LINKS'){
        snakeX = snakeX - snakeSize;
     }
    if(richtung === 'RECHTS'){ 
        snakeX = snakeX + snakeSize;
    }
    if(richtung === 'HOCH'){ 
        snakeY = snakeY - snakeSize;
    }
    if(richtung === 'RUNTER'){ 
        snakeY = snakeY + snakeSize;
    }

    // bleib im spielfeld
    if(snakeX > maxW){
        snakeX = maxW - snakeSize;
    }
    if(snakeY > maxH){
        snakeY = maxH - snakeSize;
    }
    // bleib im spielfeld
    if(snakeX < 0 - snakeSize){
        snakeX = 0;
    }
    if(snakeY < 0 - snakeSize){
        snakeY = 0;
    }
}

function zeichneSnake() {
    zeichneRechteck(snakeX, snakeY, snakeSize, snakeSize, "black");
}


/** ######################################
 *  # essen
 */
const foodSize = 8;
let foodX;
let foodY;

function setzeFood() {
    const zufaelligePosition = gibZufälligePosition(snakeSize);
    foodX = zufaelligePosition.x;
    foodY = zufaelligePosition.y;
}
function zeichneFood() {
    zeichneRechteck(foodX, foodY, foodSize, foodSize, "orange");
}


/**
 * ######################################
 * # Animation
 */
export function update(){
    bewegeSnake();

    if(snakeX === foodX && snakeY === foodY ){
        console.log("mampf")
        setzeFood();
        score++;
    }

    if(snakeX >= maxW || snakeX < 0 || snakeY >= maxH ||  snakeY < 0){
        console.log("ouch!")
        score = 0;
    }
}

export function zeichne(time) {
    zeichneSpielBrett();
    zeichneScore();
    zeichneSnake();
    zeichneFood();
}

export function beiStart(){
    console.log("spiel vorbereitung läuft...")
    addEventListener("keypress", beiTastatur);
    setzeSnake();
    setzeFood();
}

/**
 * @param {KeyboardEvent}
 */
function beiTastatur(event){
    let key = event.key;
    if(key === 'a' && richtung !== 'RECHTS'){
        richtung = 'LINKS'
     }
    if(key === 'd' && richtung !== 'LINKS'){ 
        richtung = 'RECHTS'
    }
    if(key === 'w' && richtung !== 'RUNTER'){ 
        richtung = 'HOCH'
    }
    if(key === 's' && richtung !== 'HOCH'){ 
        richtung = 'RUNTER'
    }
    if(key === ' '){ 
        console.log("pause")
        richtung = ''
    }
}

/**
 * ######################################
 * # Hilfsfunktionen
 */


/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {'white' | 'black' | 'blue' | 'orange'} color
 */
function zeichneRechteck(x, y, w, h, color){
    zeichenKontext.fillStyle = color ?? "black";
    zeichenKontext.fillRect(x, y, w, h);
}

/** Eine Zufällige position auf dem Spielbrett für ein Raster mit definierten Abstand */
function gibZufälligePosition(abstand) {
    const zeilen = Math.floor(maxW / abstand);
    const spalten = Math.floor(maxH / abstand);
    return {x: Math.floor(Math.random() * zeilen) * abstand, y: Math.floor(Math.random() * spalten) * abstand}
}