
import { createEngine, getContext } from './engine/index.js';
import { createGame } from './game-objects/game.js';
import { createSoundsManager } from './game-objects/sounds.js';
import { createUi, } from './ui/interface.js';

const engine = createEngine();

/** @type {ReturnType<typeof createGame>} */
let game = undefined;
/** @type {ReturnType<typeof createUi>} */
let ui = undefined;
/** @type {ReturnType<typeof createSoundsManager>} */
let soundManager;

let ambientSound;
function onStart() {
    soundManager = createSoundsManager();
    game = createGame(getContext(), soundManager);
    game.start();
    ui = createUi(getContext(), game);
    ambientSound = soundManager.getSound(soundManager.map['ambients']);
    ambientSound.setVolume(0.3);
    ambientSound.toggleLoop(true);
    ambientSound.speed(0.8);
}

function update(time) {
    if (game.state === 'START') {
        game.start();
    }
   
    if (game.state !== "RUNNING") {
        ambientSound.pause();
        if (game.state == "GAME_OVER") {
            if(game.score.isHighScore){
                soundManager.getSound(soundManager.map['game-over-highscore']).play({onlyOnce: true});
            }else{
                soundManager.getSound(soundManager.map['game-over']).play({onlyOnce: true});
            }
            return;
        }
        return;
    }
    ambientSound.play();
    const thirdSpeed = (game.player.speed.max + game.player.speed.min) / 3;
   
    if( game.player.speed.current >= game.player.speed.max){
        ambientSound.speed(1.4);
    }
    else if(game.player.speed.current > thirdSpeed * 2){
        ambientSound.speed(1.2);
    }
    else if(game.player.speed.current > thirdSpeed ){
        ambientSound.speed(1);
    }else {
        ambientSound.speed(0.8);
    }
    
    game.update(time);

}

function zeichne(time) {
    game.draw( time);
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
