import {createLevel} from './level.js'
import {createSnake} from './snake.js'
import {createFood} from './food.js'
import {createBoard} from './board.js'
import {handlePlayerInput} from './input.js'
/** Eine Zufällige position auf dem Spielbrett für ein Raster mit definierten Abstand */

/** @type {ReturnType<typeof createSnake>} */
let snake;
/** @type {ReturnType<typeof createLevel>} */
let level;
let pickUpItems = new Map();
/** @type {number} */
let scale;
/** @type {'RUNNING' | 'GAME_OVER' | 'PAUSE' | 'START'} */
let state = 'START';
/** @type {{current: number, last: number, high: number}} */
let score;
/** @type {ReturnType<typeof createBoard>} */
let board;

export function createGame(ctx){
    scale = 15;
    addEventListener("keypress", (e) => handlePlayerInput(e, getGameState()));
    return {
        get state(){return state},
        get score(){return score},
        get level(){return level},
        start: () => startGame(ctx),
        draw,
        update
    }
}

function startGame(ctx){
    level = createLevel(ctx, scale);
    board = createBoard(getGameState());
    snake = createSnake({ pos: board.getCenter(getGameState()), scale });
    addFood();
    score = {current: 0, last: score?.current ?? 0, high: score?.high ?? 0};
    state = 'RUNNING';
}

function addFood(){
    const food = createFood({pos: board.randomEmptyPosition(getGameState()), scale});
    pickUpItems[food.id] = food;
}
function removeFood(id){
    delete pickUpItems[id];
}

export function getGameState(){
    return {
        snake,
        level,
        pickUpItems,
        score,
        get state(){return state},
        set state(value){state = value},
        scale
    }
}

function draw(time){
    level.draw(getGameState(), time);
    snake.draw(getGameState(), time);
    Object.values(pickUpItems).forEach(p => p.draw())
}

function update(time){
    snake.update(getGameState(), time);
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
    return level.collided(snake.pos);
}

/** Verlierer Bedingung: tod durch "in den eigenen Schwanz beißen */
function playerLostBySelfDestruct(){
    let head = snake.pos;
    return snake.collided(head); 
}

/** Score Bedingung: Pickup Food */
function findFood(){
    return Object.values(pickUpItems).filter(f => f.type === 'FOOD').find(f => f.collided(snake.pos));
}

function snakeEats(id) {
    console.log("snake eats food with id ", id);
    removeFood(id);
    score.current++;
    snake.grow();
    snake.increaseSpeed();
    addFood();
}

export function gameOver() {
    console.log("game over");
    state = 'GAME_OVER';
    score.high = Math.max(score.high, score.current);
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
