export * from './lib.js';
export * from './globals.js';
import { globals } from './globals.js';
import {noop} from './lib.js';

const aktuellerBrowserFenster = window;

let onStart = noop;
let update = noop;
let draw = noop;


let lastRenderSecond;
const glob = globals();

export function createEngine(){
    return {
        setOnStartHandler: (handler) => onStart = handler,
        setUpdateHandler: (handler) => update = handler,
        setDrawHandler: (handler) => draw = handler,
        get globals(){return globals()},
        start: initializeEngine
    }
}

function initializeEngine() {
    console.log(`initializing game engine - fps:${glob.fps}`)
    onStart();
    aktuellerBrowserFenster.requestAnimationFrame(gameLoop);
}

function drawFrame(elapsedMilliseconds) {
    let secondsToRender = elapsedMilliseconds / 1000;
    const shouldRender = shouldRenderFrame(lastRenderSecond, secondsToRender, glob.fps);

    if( shouldRender) {
        update(secondsToRender)
        draw(secondsToRender);
        lastRenderSecond  = secondsToRender;
    }
}

function gameLoop(currentTime) {
    drawFrame(currentTime);
    aktuellerBrowserFenster.requestAnimationFrame(gameLoop);
}

function shouldRenderFrame(lastRenderSecond, secondsToRender, fps){
    if(typeof lastRenderSecond === "undefined"){
        return true;
    }
    glob.deltaTime = secondsToRender - lastRenderSecond; 
    return (glob.deltaTime) >= (1 / fps);
}