
import {handlePlayerInput} from './input.js'
import {createGameState} from './state.js'
/** Eine Zufällige position auf dem Spielbrett für ein Raster mit definierten Abstand */

let gameState;
let scale;

export function createGame(ctx){
    console.log("creating game")
    scale = 15;
    addEventListener("keypress", (e) => handlePlayerInput(e, gameState));
    return {
        get state(){return gameState.state},
        get score(){return gameState.score},
        get level(){return gameState.level},
        start: () => startGame(ctx),
        draw,
        update
    }
}

function startGame(ctx){
    console.log("starting game")
    gameState = createGameState(ctx, scale);
    gameState.state = "RUNNING"
}

function draw(time){
    gameState.level.draw(gameState, time);
    gameState.snake.draw(gameState, time);
    Object.values(gameState.pickUpItems).forEach(p => p.draw())
}

function update(time){
    gameState.snake.update(gameState, time);
    maybe(isGameOver(), gameOver)
    maybe(findFood(), (food) => snakeEats(food.id));
    // level.update(getGameState(), time);
    // Object.values(pickUpItems).forEach(p => p.update())
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
function findFood(){
    return Object.values(gameState.pickUpItems).filter(f => f.type === 'FOOD').find(f => f.collided(gameState.snake.pos));
}

function snakeEats(id) {
    console.log("snake eats food with id ", id);
    gameState.removeFood(id);
    gameState.score.current++;
    gameState.snake.grow();
    gameState.snake.increaseSpeed();
    gameState.addFood();
}

export function gameOver() {
    const score = gameState.score;
    console.log("game over", score);
    gameState.state = 'GAME_OVER';
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
