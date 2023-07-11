import {createGameState} from './state.js'
/**
 * @param {KeyboardEvent} event
 * @param {ReturnType<typeof createGameState>} game
 */
export function handlePlayerInput(event, game) {
    // damit die Schlangen nicht in sich selber reinlaufen kann, müssen wir prüfen, in welche Richtung der schwanz geht
    const lastDirection = game.snake.body[0]?.dir;
    const player = game.snake;
    
    let key = event.key;
    if (key === 'a' || key == 'ArrowLeft' && (player.direction !== 'RECHTS' && lastDirection !== 'RECHTS')) {
        player.direction = 'LINKS'
    }
    if (key === 'd' || key == 'ArrowRight' && (player.direction !== 'LINKS' && lastDirection !== 'LINKS')) {
        player.direction = 'RECHTS'
    }
    if (key === 'w' || key == 'ArrowUp' && (player.direction !== 'RUNTER' && lastDirection !== 'RUNTER')) {
        player.direction = 'HOCH'
    }
    if (key === 's' || key == 'ArrowDown' && (player.direction !== 'HOCH' && lastDirection !== 'HOCH')) {
        player.direction = 'RUNTER'
    }
    if (key === ' ') {
        if (game.state === 'PAUSE') {
            game.state = 'RUNNING';
        }
        else if (game.state === 'RUNNING') {
            game.state = 'PAUSE';
        }
        else if (game.state === 'GAME_OVER') {
            game.state = 'START'
        }
    }
}