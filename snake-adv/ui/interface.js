import { createBlinkAnimation } from "../engine/index.js";

let canvas2dContext; 
let maxH;
let maxW;

export function createUi(_ctx, game){
     maxW = game.level.width.max;
     maxH = game.level.height.max;
     canvas2dContext = _ctx;
    return {
        drawGameOver,
        drawPause,
        drawScoreboard,
        drawReplay
    }
}
 function drawGameOver() {

    const gameOverTxt = 'GAME OVER';
    canvas2dContext.textAlign = 'center'
    canvas2dContext.fillStyle = 'red'
    canvas2dContext.font = '30px serif'
    canvas2dContext.fillText(gameOverTxt, (maxW) / 2, maxH / 2)
}

 function drawPause() {
    const gameOverTxt = 'PAUSE';
    canvas2dContext.textAlign = 'center'
    canvas2dContext.fillStyle = 'grey'
    canvas2dContext.font = '30px serif'
    canvas2dContext.fillText(gameOverTxt, (maxW) / 2, maxH / 2);
}

 function drawScoreboard(score) {
    if (score.isHighScore) {
        const gameOverTxt = `NEW HIGH SCORE: ${score.high}`;
        canvas2dContext.textAlign = 'center'
        canvas2dContext.fillStyle = 'green'
        canvas2dContext.font = '15px serif'
        canvas2dContext.fillText(gameOverTxt, (maxW) / 2, maxH / 2 + 30)
    } else {
        const gameOverTxt = `Your Score: ${score.current}`;
        canvas2dContext.textAlign = 'center'
        canvas2dContext.fillStyle = 'black'
        canvas2dContext.font = '15px serif'
        canvas2dContext.fillText(gameOverTxt, (maxW) / 2, maxH / 2 + 30)

    }
}

let animation;
 function drawReplay(render) {
    if (!animation) {
        animation = createBlinkAnimation({ show: 0.7, hide: 0.5 }, () => {
            const txt = 'PRESS SPACE TO CONTINUE';
            canvas2dContext.textAlign = 'center'
            canvas2dContext.fillStyle = 'grey'
            canvas2dContext.font = '15px serif'
            canvas2dContext.fillText(txt, (maxW) / 2, maxH / 2 + 60)
        })
    }
    animation.render(render);
}

