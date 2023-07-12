
import {handlePlayerInput} from './input.js'
import { createSoundsManager } from './sounds.js';
import {createGameState} from './state.js'
/** Eine Zufällige position auf dem Spielbrett für ein Raster mit definierten Abstand */
/** @type {ReturnType<typeof createGameState>} */
let gameState;
/** @type {ReturnType<createSoundsManager>} */
let soundManager;
let scale;

export function createGame(ctx, _soundManager){
    console.log("creating game")
    scale = 15;
    soundManager = _soundManager;
    document.body.addEventListener("keydown", (e) => handlePlayerInput(e, gameState));

    return {
        get state(){return gameState.state},
        get score(){return gameState.score},
        get level(){return gameState.level},
        get player(){return gameState.snake},
        start: () => startGame(ctx),
        draw,
        update
    }
}

function startGame(ctx){
    console.log("starting game")
    gameState = createGameState(ctx, scale);
    gameState.state = "RUNNING";
}

function draw(time, ctx){
    gameState.level.draw(gameState, time);
    gameState.snake.draw(ctx);
    Object.values(gameState.pickUpItems).forEach(p => p.draw())
}

function update(time){
    gameState.snake.update(gameState, time);
    maybe(isGameOver(), gameOver)
    maybe(findPickUp(), (pickUp) => snakeEats(pickUp));
    // level.update(getGameState(), time);
    // Object.values(pickUpItems).forEach(p => p.update())
}

function isEventTriggered(){
    const score = gameState.score.current;
    // every 5th time chances get better
    const isInDropInterval = score && score % 5 === 0;

    let chance = isInDropInterval? 0.8 : 0.1;
    const hitChance = Math.random() <= chance;
    if( hitChance){
        return true;        
    }
    console.log("event missed: ", {isInDropInterval, hitChance})
    return false;
}

function dropSpecial(){
    const hitChance = Math.random() <= .5;
    let specialType = hitChance? 'SLOWDOWN' : 'BOOST';
    gameState.addSpecial(specialType);
}

/**
 * ######################################
 * Spielregeln 
 */

function isGameOver(){
    const bySelfDestruct = playerLostBySelfDestruct();
    const byEnvironment = playerLostByEnvironment();
    if(bySelfDestruct){
        console.log("snake lost by self destruction")
    }
    if(byEnvironment){
        console.log("snake was killed by environment")
    }
    return bySelfDestruct || byEnvironment ;
}

/** Verlierer Bedingung: tod durch Wand */
function playerLostByEnvironment(){
    return gameState.level.collided(gameState.snake.pos);
}

/** Verlierer Bedingung: tod durch "in den eigenen Schwanz beißen */
function playerLostBySelfDestruct(){
    let head = gameState.snake.pos;
    return gameState.snake.collided(head); 
}

/** Score Bedingung: Pickup Food */
function findPickUp(){
    return Object.values(gameState.pickUpItems).find(f => f.collided(gameState.snake.pos));
}

function snakeEats(pickUp) {
    const id = pickUp.id;
    const sounds = soundManager.map;
    switch(pickUp.type){
        case 'FOOD': {
            console.log("snake eats food with id ", id);
            soundManager.getSound(sounds['snake-eat-food']).play();
            gameState.removePickup(id);
            gameState.score.current++;
            gameState.snake.grow();
            gameState.snake.increaseSpeed();
            gameState.addFood();
            
            maybe(isEventTriggered(), dropSpecial);
            break;
        }
        case 'SLOWDOWN': {
            console.log("snake eats slowdown with id ", id);
            soundManager.getSound(sounds['snake-eat-special']).play();
            gameState.removePickup(id);
            gameState.snake.decreaseSpeed();
            break;
        }
        case 'BOOST': {
            console.log("snake eats slowdown with id ", id);
            soundManager.getSound(sounds['snake-eat-special']).play();
            gameState.removePickup(id);
            gameState.snake.increaseSpeed(5);
            break;
        }
    }

}

export function gameOver() {
    const score = gameState.score;
    console.log("game over", score);
    gameState.state = 'GAME_OVER';
    if(score.current > score.high) {
        score.high = score.current;
        score.isHighScore = true;
        soundManager.getSound(soundManager.map['game-over-highscore']).play();
    }
    score.high  = Math.max(score.high, score.current);
}


function maybe(condition, func){
    const isBoolean = typeof condition === "boolean";
    if( isBoolean && condition){
        return func();
    }
    
    if(!isBoolean && typeof condition !== "undefined"){
        return func(condition);
    }
}
