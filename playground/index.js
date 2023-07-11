/***  @type {HTMLCanvasElement} */
const canvasHtmlElement = document.getElementById("canvas");
/***  @type {CanvasRenderingContext2D} */
const ctx = canvasHtmlElement.getContext("2d")
/*** @type {HTMLInputElement} */
const fpsSlider = document.getElementById("fps-slider");

let board = {maxW: ctx.canvas.clientWidth, maxH: ctx.canvas.clientHeight};

let lastRenderSec;
let deltaTime;
let fps = 1;
function gameLoop(time){
    let currentRenderSec = time / 1000;
    if(!lastRenderSec){
        lastRenderSec = currentRenderSec;
        // we skip first frame;
        requestAnimationFrame(gameLoop);
        return;
    }
    deltaTime = currentRenderSec - lastRenderSec;
    if(deltaTime >= 1/fps){
        update();
        draw();
        lastRenderSec = currentRenderSec;
        console.log(`rendering at ${fps} fps`)
    }
    fps = fpsSlider.value;
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

let size = 10;
let vecStart = { x: 0, y: 0};
let vecLast = {...vecStart};
let vecCurrent = {...vecStart};
let vecEnd = { x: board.maxW - size, y: board.maxH - size}

let vectors = [vecStart, vecEnd];

let isAnimating = false;

/**
 * Game logic
 */
function update(time){
    if(isAnimating){
        return;
    }
    console.log("updating...")
    vecLast = {...vecCurrent};
    vecCurrent.x += size;
    if(vecCurrent.x > vecEnd.x){
        vecCurrent.x = vecStart.x;
    }
}

let lastAnimatedVec;
let duration = 0;
function draw(){

    ctx.clearRect(0, 0, board.maxW, board.maxH);
    const startVec = {...vecLast};
    const endVec = {...vecCurrent};
    if(!lastAnimatedVec){
        isAnimating = true;
        lastAnimatedVec = {...vecLast};
    }

    while(lastAnimatedVec.x <= endVec.x){
        // lastAnimatedVec.x += size * 2 * deltaTime;
        duration += deltaTime;

        ctx.setLineDash([6]);
        ctx.strokeStyle = "blue"
        ctx.strokeRect(startVec.x,startVec.y, size, size);

        lastAnimatedVec.x = startVec.x + (endVec.x - startVec.x) * duration;
        lastAnimatedVec.y = startVec.y + (endVec.y - startVec.y) * duration;

        ctx.fillStyle = "black";
        ctx.fillRect(lastAnimatedVec.x,lastAnimatedVec.y, size, size);

        ctx.strokeStyle = "red"
        ctx.setLineDash([6])
        ctx.strokeRect(endVec.x,endVec.y, size, size);
        return;
    }
    isAnimating = false;
    lastAnimatedVec = undefined;
    duration = 0;
    ctx.fillStyle = "black";
    ctx.fillRect(vecCurrent.x,vecCurrent.y, size, size);
}