import {createLevel} from './level.js'
import {createSnake} from './snake.js'
import {createFood} from './food.js'
import {createBoard} from './board.js'

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
        removeFood
    }
}

function addFood(){
    console.log("adding food");
    const food = createFood({pos: board.randomEmptyPosition(getGameState()), scale});
    pickUpItems[food.id] = food;
}

function removeFood(id){
    console.log("removing food", id);
    delete pickUpItems[id];
}