import { drawRecFilled } from "../../engine/index.js";

let size, x, y;

/** @param {{pos: {x: number, y: number}, scale: number}} options  */
export function createBoost(options) {
    size = options.scale * 0.8
    const {pos} = options;
    x = pos.x;
    y = pos.y;
    return {
        get x(){return x},
        get y(){return y},
        type: 'BOOST',
        id: `boost`,
        collided,
        draw,
        update 
    }
}

function draw() {
    drawRecFilled(x, y, size, size, "red");
}

function update() {
}

function collided(pos){
    return pos.x === x && pos.y === y;
}
