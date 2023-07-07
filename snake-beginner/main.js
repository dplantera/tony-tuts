import {beiStart, zeichne, update, speed} from './lesson-04/spiel.js';

const aktuellerBrowserFenster = window;

/**
 * Machen wir dann später mal
 */
let lastRenderSecond;

/**
 * Wir bereiten das Spiel vor und starten es.
 */
export function vorbereiteUndStarteSpiel() {
    beiStart();
    aktuellerBrowserFenster.requestAnimationFrame(gameLoop);
}

function drawFrame(elapsedMilliseconds) {
    let secondsToRender = elapsedMilliseconds / 1000;
    const shouldRender = shouldRenderFrame(lastRenderSecond, secondsToRender, speed);

    if( shouldRender) {
        update(lastRenderSecond)
        zeichne(lastRenderSecond);
        lastRenderSecond  = secondsToRender;

    }
}

/**
 * Diese Funktion sorgt nur dafür, damit das spiel automatisch läuft.
 */
function gameLoop(currentTime) {
    drawFrame(currentTime);
    aktuellerBrowserFenster.requestAnimationFrame(gameLoop);
}


function shouldRenderFrame(lastRenderSecond, secondsToRender, fps){
    if(typeof lastRenderSecond === "undefined"){
        return true;
    }
    return (secondsToRender- lastRenderSecond) >= (1 / fps);
}