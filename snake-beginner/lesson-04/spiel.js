/**
 * - wir optimieren:
 *  - food wird auf eine freie Position gesetzt
 *  - 
 */

import { deltaTime } from "../main.js";


/**
 * ######################################
 * # Html Elemente / html elements
 */

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
/** @type {'RUNNING' | 'GAME_OVER' | 'PAUSE' | 'START'} */
let state = 'START';
let speedMin = 10;
let speedMax = 30;
export let speed;

let score = 0;
let lastScore = 0;
let highScore = 0;
function zeichneSpielBrett() {
    zeichneRechteck(0, 0, maxW, maxH, "black");
    zeichneRechteck(1, 1, maxW - 2, maxH - 2, "white");

}
function zeichneScore() {
    scoreElement.textContent = `score: ${score} - ${speed}`
}

function zeichneGameOver() {
    const gameOverTxt = 'GAME OVER';
    zeichenKontext.textAlign = 'center'
    zeichenKontext.fillStyle = 'red'
    zeichenKontext.font = '30px serif'
    zeichenKontext.fillText(gameOverTxt, (maxW) / 2, maxH / 2)
}

function zeichnePause() {
    const gameOverTxt = 'PAUSE';
    zeichenKontext.textAlign = 'center'
    zeichenKontext.fillStyle = 'grey'
    zeichenKontext.font = '30px serif'
    zeichenKontext.fillText(gameOverTxt, (maxW) / 2, maxH / 2)
}

function zeichneEndScore() {
    if (lastScore !== score && score >= highScore) {
        const gameOverTxt = `NEW HIGH SCORE: ${score}`;
        zeichenKontext.textAlign = 'center'
        zeichenKontext.fillStyle = 'green'
        zeichenKontext.font = '15px serif'
        zeichenKontext.fillText(gameOverTxt, (maxW) / 2, maxH / 2 + 30)
    } else {
        const gameOverTxt = `Your Score: ${score}`;
        zeichenKontext.textAlign = 'center'
        zeichenKontext.fillStyle = 'black'
        zeichenKontext.font = '15px serif'
        zeichenKontext.fillText(gameOverTxt, (maxW) / 2, maxH / 2 + 30)

    }
}

let animation;
function zeichneWiederholung(render) {
    if (!animation) {
        animation = createAnimation({ show: 0.7, hide: 0.5 }, () => {
            const gameOverTxt = 'PRESS SPACE TO CONTINUE';
            zeichenKontext.textAlign = 'center'
            zeichenKontext.fillStyle = 'grey'
            zeichenKontext.font = '15px serif'
            zeichenKontext.fillText(gameOverTxt, (maxW) / 2, maxH / 2 + 60)
        })
    }
    animation.render(render);
}

function createAnimation(animationTime, animation) {
    let last;
    let show = true;
    return {
        last,
        render(sec) {
            if (typeof this.last === "undefined") {
                this.last = sec;
            }
            if (show && (sec - this.last) >= animationTime.show) {
                show = !show;
                this.last = sec;
            }
            else if (!show && (sec - this.last) >= animationTime.hide) {
                show = !show;
                this.last = sec;
            }

            if (show) {
                animation();
            }
        }
    }
}

/**
 * ######################################
 * # snake
 */
const snakeSize = 10;
let snakeX;
let snakeY;
let body;
/** @type {'HOCH' | 'RUNTER' | 'LINKS' | 'RECHTS'} */
let playerDirection = 'RECHTS';
function setzeSnake() {
    const pos = gibZufälligePosition(snakeSize);
    snakeX = pos.x;
    snakeY = pos.y;
    body = [];
    body.push({ x: pos.x, y: pos.y, dir: playerDirection });
}

let last;
function bewegeSnake(time) {
    if (state !== 'RUNNING') {
        return;
    }
    
    if(last && time - last < 1/10 ) {
        return;
    }
    last = time;

    // bewege kopf
    if (playerDirection === 'LINKS') {
        snakeX = snakeX - snakeSize;
    }
    if (playerDirection === 'RECHTS') {
        snakeX = snakeX + snakeSize;
    }
    if (playerDirection === 'HOCH') {
        snakeY = snakeY - snakeSize;
    }
    if (playerDirection === 'RUNTER') {
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
    body[0] = { x: snakeX, y: snakeY, dir: playerDirection };
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
    const zufaelligePosition = gibZufälligeFreiePosition(snakeSize, body);
    foodX = zufaelligePosition.x;
    foodY = zufaelligePosition.y;
}
function zeichneFood() {
    zeichneRechteck(foodX, foodY, foodSize, foodSize, "orange");
}

/**
 * ######################################
 * Spielregeln 
 */

function spielerHatVerloren(){
    return snakeIstInDieWandGelaufen() || snakeHatSichInDenEigenenSchwanzGebissen();
}

/** Verlierer Bedingung: tod durch Wand */
function snakeIstInDieWandGelaufen(){
    return snakeX >= maxW || snakeX < 0 || snakeY >= maxH || snakeY < 0;
}

/** Verlierer Bedingung: tod durch "in den eigenen Schwanz beißen */
function snakeHatSichInDenEigenenSchwanzGebissen(){
    let head = body[0];
    let tail = body.slice(1);
    return tail.some(s => s.x === head.x && s.y === head.y); 
}

/** Score Bedingung: Pickup Food */
function snakeHatDasEssenGefunden(){
    return snakeX === foodX && snakeY === foodY;
}

function spielvorbereitung(){
    setzeSnake();
    setzeFood();
    lastScore = score;
    score = 0;
    speed = speedMin;
    state = 'RUNNING';
}

function snakeIsst() {
    body.push({ x: snakeX, y: snakeY, dir: playerDirection });
    console.log("mampf", body);
    setzeFood();
    score++;
    speed = increaseSpeed(speed);
}

export function increaseSpeed(currentSpeed){
    const halfMaxSpeed = speedMax / 2;
    if(speedMax  <= currentSpeed) {
        return speedMax;
    }
    return currentSpeed + 0.5;;
}
function spielende() {
    state = 'GAME_OVER';
    highScore = Math.max(highScore, score);
}
window.increaseSpeed = increaseSpeed;
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

/** Eine Zufällige freie position auf dem Spielbrett für ein Raster mit definierten Abstand */
function gibZufälligeFreiePosition(abstand, snakeBody) {
    let neuePosition = gibZufälligePosition(abstand);
    let istAufSnake = liegtPosAufEinerBelegtenPosition(neuePosition, snakeBody);

    while (istAufSnake) {
        neuePosition = gibZufälligePosition(abstand);
        istAufSnake = liegtPosAufEinerBelegtenPosition(neuePosition, snakeBody);
    }
    return neuePosition
}
/** Gibt an, ob eine bestimmte position (x, y) auf einer Auswahl von belegten position liegt [(x,y), (x,y)] */
function liegtPosAufEinerBelegtenPosition(pos, belegtePositionen) {
    for (let belegtePosition of belegtePositionen) {
        if (pos.x === belegtePosition.x && pos.y === belegtePosition.y) {
            return true;
        }
    }
    return false;
}

/**
 * ######################################
 * # Animation
 */
export function update(time) {
    if (state === 'START') {
        spielvorbereitung();
    }

    bewegeSnake(time);
    
    if (spielerHatVerloren()) {
        spielende();
    }

    if (state === 'GAME_OVER') {
        return;
    }
    
    if (snakeHatDasEssenGefunden()) {
        snakeIsst();
    }
}


export function zeichne(time) {
    zeichneSpielBrett();
    zeichneScore();
    zeichneSnake();
    zeichneFood();

    if (state === 'GAME_OVER') {
        zeichneGameOver();
        zeichneEndScore();
        zeichneWiederholung(time);
    }
    else if (state === 'PAUSE') {
        zeichnePause()
        zeichneWiederholung(time);
    }
}

export function beiStart() {
    console.log("spiel vorbereitung läuft...")
    addEventListener("keypress", beiTastatur);
    state = 'START';
}

/**
 * @param {KeyboardEvent}
 */
function beiTastatur(event) {
    // damit die Schlangen nicht in sich selber reinlaufen kann, müssen wir prüfen, in welche Richtung der schwanz geht
    const letzteRichtung = body[0]?.dir;
    let key = event.key;
    if (key === 'a' && (playerDirection !== 'RECHTS' && letzteRichtung !== 'RECHTS')) {
        playerDirection = 'LINKS'
    }
    if (key === 'd' && (playerDirection !== 'LINKS' && letzteRichtung !== 'LINKS')) {
        playerDirection = 'RECHTS'
    }
    if (key === 'w' && (playerDirection !== 'RUNTER' && letzteRichtung !== 'RUNTER')) {
        playerDirection = 'HOCH'
    }
    if (key === 's' && (playerDirection !== 'HOCH' && letzteRichtung !== 'HOCH')) {
        playerDirection = 'RUNTER'
    }
    if (key === ' ') {
        if (state === 'PAUSE') {
            state = 'RUNNING';
        }
        else if (state === 'RUNNING') {
            state = 'PAUSE';
        }
        else if (state === 'GAME_OVER') {
            state = 'START'
        }
    }
}