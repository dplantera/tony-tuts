
import { createEngine, getContext } from './engine/index.js';
import { createGame } from './game-objects/game.js';
import { createUi, } from './ui/interface.js';

const engine = createEngine();

/** @type {ReturnType<typeof createGame>} */
let game = undefined;
/** @type {ReturnType<typeof createUi>} */
let ui = undefined;

function onStart() {
    game = createGame(getContext());
    game.start();
    ui = createUi(getContext(), game);
}

function update(time) {
    if (game.state === 'START') {
        game.start();
    }
    if (game.state !== "RUNNING") {
        return;
    }
    game.update(time);
}

function zeichne(time) {
    game.draw(time);
    if (game.state === "PAUSE") {
        ui.drawPause();
    }
    else if(game.state === "GAME_OVER"){
        ui.drawGameOver();
        ui.drawScoreboard(game.score);
        ui.drawReplay(time);
    }
}


engine.globals.fps = 60;
engine.setOnStartHandler(onStart);
engine.setUpdateHandler(update);
engine.setDrawHandler(zeichne);
engine.start();
