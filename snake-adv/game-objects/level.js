import { drawRecFilled } from "../engine/index.js";

let minW, maxW, minH, maxH;

/**
 * 
 * @param {CanvasRenderingContext2D}} ctx 
 */
export function createLevel(ctx, scale){
    minW = 0;
    minH = 0;
    maxW = 350 * scale/10;
    maxH = 250 * scale/10;
    ctx.canvas.width = maxW;
    ctx.canvas.height = maxH;
    console.log(`creating level:`, {maxW, maxH})
    return {
        get width(){return {min: minW, max: maxW}},
        get height(){return {min: minH, max: maxH}},
        collided,
        draw,
        update
    }
}

function draw() {
    drawRecFilled(0, 0, maxW, maxH, "black");
    drawRecFilled(1, 1, maxW - 2, maxH - 2, "white");
}

function update() {

}

function collided(pos){
    return pos.x >= maxW || pos.x < 0 || pos.y >= maxH || pos.y < 0;
}