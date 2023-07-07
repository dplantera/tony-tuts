/* lesson-01
 * - wir holen uns HtmlElemente und speichern sie in globalen variablen:
 *       canvasHtmlElement, zeichenKontext
 * - wir erstellen uns HtmlElemente und speichern sie in globalen variablen:
 *       scoreElement, hudElement
 * - wir erstellen und verwenden Hilfs-Funktionen
 *       "zeichneRechteck", welche uns das zeichnen etwas erleichtert
 *       "gibZufälligePosition", welche uns eine zufällige Position auf dem Spielfeld ausgibt
 * - wir zeichnen:
 *       ein Rechteck
 *       das Spielfeld
 *       die Spielfigur "snake", erstmals mit einer festen position
 *       ein Pick-Up Item "food", erstmals mit einer festen position
 *       den initialen Punktestand "score" in einem entsprechenden HtmlElement
 * - wir updaten:
 *       die Bewegungsrichtung von "snake", in dem wir eine globale Variable "playerDirection" je nach tastendruck von W, S, A, D neu setzen auf 'HOCH' | 'RUNTER' | 'LINKS' | 'RECHTS'  
 *       die Bewegung von "snake", in dem wir die x- und y-Koordinate von "snake" jeweils in einer globalen Variable speichern und mit Hilfe der Bewegungsrichtung neu setzen 
 *       den Punktestand "score" je nach "Spielregel", indem wir die globale Variable "score" neu setzen
 *       die Position von "food" je nach "Spielregel", indem wir die x- und y-Koordinate von "food" jeweils in einer globalen Variable speichern und mit Hilfe der Funktion "gibZufälligePosition" neu setzen
 * - wir implementieren Spielregeln:
 *       "snake" darf nie das Spielfeld verlassen - wenn "snake" die Spielfeldgrenzen erreicht, dann bleibt die Figur vor der Grenze einfach stehen. 
 *       wenn wir die Leertaste drücken, wollen wir das Spiel pausieren.
 *       wenn "snake" das item "food" erreicht bzw "isst", dann:
 *              zählen wir den Punktestand um eins hoch (Inkrementieren)  
 *              verschieben wir "food" auf eine neue zufällige Position
 */

/**
 * ######################################
 * # Html Elemente
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
let playerDirection = 'RECHTS';
function setzeSnake(){
    const pos = gibZufälligePosition(snakeSize);
    snakeX = pos.x;
    snakeY = pos.y;
}

function bewegeSnake() {
    if(playerDirection === 'LINKS'){
        snakeX = snakeX - snakeSize;
     }
    if(playerDirection === 'RECHTS'){ 
        snakeX = snakeX + snakeSize;
    }
    if(playerDirection === 'HOCH'){ 
        snakeY = snakeY - snakeSize;
    }
    if(playerDirection === 'RUNTER'){ 
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
 * # Verarbeitung von Nutzer Eingaben / handle user input ()
 */

/**
 * @param {KeyboardEvent}
 */
function beiTastatur(event){
    let key = event.key;
    if(key === 'a' && playerDirection !== 'RECHTS'){
        playerDirection = 'LINKS'
     }
    if(key === 'd' && playerDirection !== 'LINKS'){ 
        playerDirection = 'RECHTS'
    }
    if(key === 'w' && playerDirection !== 'RUNTER'){ 
        playerDirection = 'HOCH'
    }
    if(key === 's' && playerDirection !== 'HOCH'){ 
        playerDirection = 'RUNTER'
    }
    if(key === ' '){ 
        console.log("pause")
        playerDirection = ''
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
