import {createLevel} from './level.js'
import {createSnake} from './snake.js'
import {createBoard} from './board.js'
import {createFood} from './pickups/food.js'
import {createBoost} from './pickups/boost.js'
import {createSlowdown} from './pickups/slowdown.js';

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

export function createGameState(ctx, _scale){
    console.log("creating game state")
    scale = _scale;
    level = createLevel(ctx, scale);
    board = createBoard();
    snake = createSnake({ pos: board.getCenter(getGameState()), scale });
    addFood();
    score = {current: 0, last: score?.current ?? 0, high: score?.high ?? 0};

    return getGameState();
}

function getGameState(){
    return {
        get score(){return score},
        get snake(){return snake},
        get level(){return level},
        get pickUpItems(){return pickUpItems},
        get state(){return state},
        set state(value){state = value},
        scale,
        addFood,
        removePickup,
        addSpecial
    }
}

function addFood(){
    console.log("adding food");
    const pickup = createFood({pos: board.randomEmptyPosition(getGameState()), scale});
    pickUpItems[pickup.id] = pickup;
}

/** @param {'SLOWDOWN' | 'BOOST' } type */
function addSpecial(type){
    let pickup;
    switch(type){
        case 'SLOWDOWN':{
            pickup = createSlowdown({pos: board.randomEmptyPosition(getGameState()), scale});
            break;
        }
        case 'BOOST':
            pickup = createBoost({pos: board.randomEmptyPosition(getGameState()), scale});
            break;
    }
    console.log("adding special pickup:", pickup.type);
    pickUpItems[pickup.id] = pickup;
}

function removePickup(id){
    console.log("removing food", id);
    delete pickUpItems[id];
}
