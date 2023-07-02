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
let body = [];
/** @type {'HOCH' | 'RUNTER' | 'LINKS' | 'RECHTS'} */
let richtung = 'RECHTS';
function setzeSnake() {
    const pos = gibZufälligePosition(snakeSize);
    snakeX = pos.x;
    snakeY = pos.y;
    body.push({ x: pos.x, y: pos.y, dir: richtung });
}

function bewegeSnake() {
    // bewege kopf
    if (richtung === 'PAUSE') {
        return;
    }
    // bewege kopf
    if (richtung === 'LINKS') {
        snakeX = snakeX - snakeSize;
    }
    if (richtung === 'RECHTS') {
        snakeX = snakeX + snakeSize;
    }
    if (richtung === 'HOCH') {
        snakeY = snakeY - snakeSize;
    }
    if (richtung === 'RUNTER') {
        snakeY = snakeY + snakeSize;
    }

    // bleib im spielfeld
    if (snakeX > maxW) {
        snakeX = maxW - snakeSize;
    }
    if (snakeY > maxH) {
        snakeY = maxH - snakeSize;
    }
    if (snakeX < 0 - snakeSize) {
        snakeX = 0;
    }
    if (snakeY < 0 - snakeSize) {
        snakeY = 0;
    }

    // bewege alle segemente um eins
    for (let i = body.length - 1; i > 0; i--) {
        body[i] = body[i - 1];
    }
    // setze neuen kopf
    body[0] = { x: snakeX, y: snakeY, dir: richtung };
}

function zeichneSnake() {
    for (let b of body) {
        zeichneRechteck(b.x, b.y, snakeSize, snakeSize, "black");
    }
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
export function update() {

    bewegeSnake();

    // Verlierer Bedingung 1: tod durch Wand
    if (snakeX >= maxW || snakeX < 0 || snakeY >= maxH || snakeY < 0) {
        console.log("ouch!")
        score = 0;
        body = [body[0]];
    }

    // Verlierer Bedingung 2: tod durch "in den eigenen Schwanz beißen"
    let head = body[0];
    let tail = body.slice(1);
    if (tail.some(s => s.x === head.x && s.y === head.y)) {
        console.log("ouch!", tail)
        score = 0;
        body = [body[0]];
    }

    // Score Bedingung: Pickup Food
    if (snakeX === foodX && snakeY === foodY) {
        body.push({ x: snakeX, y: snakeY, dir: richtung });
        console.log("mampf", body);
        setzeFood();
        score++;
    }
}

export function zeichne(time) {
    zeichneSpielBrett();
    zeichneScore();
    zeichneSnake();
    zeichneFood();
}

export function beiStart() {
    console.log("spiel vorbereitung läuft...")
    addEventListener("keypress", beiTastatur);
    setzeSnake();
    setzeFood();
}

/**
 * @param {KeyboardEvent}
 */
function beiTastatur(event) {
    // damit die Schlangen nicht in sich selber reinlaufen kann, müssen wir prüfen, in welche Richtung der schwanz geht
    const letzteRichtung = body[0]?.dir;
    let key = event.key;
    if (key === 'a' && (richtung !== 'RECHTS' && letzteRichtung !== 'RECHTS')) {
        richtung = 'LINKS'
    }
    if (key === 'd' && (richtung !== 'LINKS' && letzteRichtung !== 'LINKS')) {
        richtung = 'RECHTS'
    }
    if (key === 'w' && (richtung !== 'RUNTER' && letzteRichtung !== 'RUNTER')) {
        richtung = 'HOCH'
    }
    if (key === 's' && (richtung !== 'HOCH' && letzteRichtung !== 'HOCH')) {
        richtung = 'RUNTER'
    }
    if (key === ' ') {
        richtung = 'PAUSE'
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
function zeichneRechteck(x, y, w, h, color) {
    zeichenKontext.fillStyle = color ?? "black";
    zeichenKontext.fillRect(x, y, w, h);
}

/** Eine Zufällige position auf dem Spielbrett für ein Raster mit definierten Abstand */
function gibZufälligePosition(abstand) {
    const zeilen = Math.floor(maxW / abstand);
    const spalten = Math.floor(maxH / abstand);
    return { x: Math.floor(Math.random() * zeilen) * abstand, y: Math.floor(Math.random() * spalten) * abstand }
}