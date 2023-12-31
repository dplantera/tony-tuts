import { drawRecFilled } from "../../engine/index.js";
import { initImage } from "../images.js";
import {createGameState} from "../state.js"
/**
 * ######################################
 * # snake
 */
let snakeSize, speed, snakeX, snakeY, body,  movement;
/** @type {'HOCH' | 'RUNTER' | 'LINKS' | 'RECHTS'} */
let playerDirection;
let img;
/** @param {{pos: {x: number, y: number}, scale: number}} options  */
export function createSnake(options) {

    console.log("creating snake", options)
    snakeSize = options.scale;
    speed = {current: 10, min: 10, max: 25};
    const pos = options.pos;
    playerDirection = 'RECHTS';
    snakeX = pos.x;
    snakeY = pos.y;
    body = [];
    movement = createMovement();
    grow();

    return {
        get pos(){return {x: snakeX, y: snakeY}},
        get body(){return body},
        set direction(dir) { playerDirection = dir}, 
        get direction() { return playerDirection},
        get speed() {return speed},
        collided,
        grow,
        increaseSpeed,
        decreaseSpeed,
        update,
        draw
    }
}
/** @param {ReturnType<typeof createGameState>} game*/
function update(game, time){
    movement.update(game, time)
}

let xIndex = 0;

/** @param {CanvasRenderingContext2D} ctx  */
function draw(ctx){
    for (let b of body) {
        drawRecFilled(b.x, b.y, snakeSize, snakeSize, "black");
    }
    let img = initImage();
    
    xIndex = ++xIndex % 2;
    let dx = body[0].x, dy = body[0].y, size = 15 
    //let posX = 1, posY = 2, posW = 9, posH = 7;
    let posX = 11 * xIndex , posY = 2, posW = 10, posH = 7;
    ctx.drawImage(img, posX,posY,posW,posH,dx,dy,size,size);
    
}

function collided(pos){
    let tail = body.slice(1);
    return tail.some(s => !s.isNew && s.x === pos.x && s.y === pos.y); 
}

export function grow(){
    body.push({ x: snakeX, y: snakeY, dir: playerDirection , isNew: true});
}

export function increaseSpeed(velocity){
    speed.current += velocity ?? 0.5;
    if(speed.max  <= speed.current) {
        speed.current = speed.max;
    }
}

export function decreaseSpeed(velocity){
    speed.current -= velocity ?? 2;
    if(speed.min > speed.current) {
        speed.current = speed.min;
    }
}

/** @param {ReturnType<typeof createGameState>} game*/
function createMovement(){
    let lastRender;
    return {
        canMove(time){
            if(lastRender && time - lastRender < 1/speed.current ){
                return false;
            }
            lastRender = time;
            return true;  
        },
        update(game, time) {
            if (game.state !== 'RUNNING') {
                return;
            }
            
            if(!this.canMove(time)){
                return;
            }

            const maxW = game.level.width.max;
            const maxH = game.level.height.max;
            // move head
            if (playerDirection === 'LINKS') {
                snakeX = snakeX - snakeSize;
            }
            if (playerDirection === 'RECHTS') {
                snakeX = snakeX + snakeSize;
            }
            if (playerDirection === 'HOCH') {
                snakeY = snakeY - snakeSize ; 
            }
            if (playerDirection === 'RUNTER') {
                snakeY = snakeY + snakeSize ;
            }
        
            // keep in game
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
                body[i].isNew = false;
            }
            // setze neuen kopf
            body[0] = { x: snakeX, y: snakeY, dir: playerDirection, isNew: false };
        }
    }
}

