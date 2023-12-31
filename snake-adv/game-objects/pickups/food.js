import { drawRecFilled } from "../../engine/index.js";

/** ######################################
 *  # essen
 */
let foodSize, foodX, foodY;

/** @param {{pos: {x: number, y: number}, scale: number}} options  */
export function createFood(options) {
    foodSize = options.scale * 0.8
    const {pos} = options;
    foodX = pos.x;
    foodY = pos.y;
    return {
        get x(){return foodX},
        get y(){return foodY},
        type: 'FOOD',
        id: `food-${foodX}-${foodY}`,
        collided,
        draw,
        update 
    }
}
function draw() {
    drawRecFilled(foodX, foodY, foodSize, foodSize, "orange");
}

function update() {
}

function collided(pos){
    return pos.x === foodX && pos.y === foodY;
}
