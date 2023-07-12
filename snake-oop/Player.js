import { Snake } from "./Snake.js";
import { SnakeInput } from "./SnakeInput.js";

export class Player {
    constructor() {
        addEventListener("keydown", this.handleInput)
        this.input = new SnakeInput(SnakeInput.RIGHT)
        this.snake = new Snake(this.input);
    }

    update(game){
        this.snake.update(this.input);
    }

    draw(game){
        this.snake.draw(game);
    }

    /** @param {KeyboardEvent} e */
    handleInput(e) {
        e.preventDefault();
        console.log("pressed", e.key)
/* 
        const letzteRichtung = body[0]?.dir;
        const playerDirection = this.snake.input.direction;
        let key = event.key;
        if (key === 'a' && (playerDirection !== 'RECHTS' && letzteRichtung !== 'RECHTS')) {
            playerDirection = 'LINKS'
        }
        if (key === 'd' && (playerDirection !== 'LINKS' && letzteRichtung !== 'LINKS')) {
            playerDirection = 'RECHTS'
        }
        if (key === 'w' && (playerDirection !== 'RUNTER' && letzteRichtung !== 'RUNTER')) {
            playerDirection = 'HOCH'
        }
        if (key === 's' && (playerDirection !== 'HOCH' && letzteRichtung !== 'HOCH')) {
            playerDirection = 'RUNTER'
        }
        if (key === ' ') {
            if (state === 'PAUSE') {
                state = 'RUNNING';
            }
            else if (state === 'RUNNING') {
                state = 'PAUSE';
            }
            else if (state === 'GAME_OVER') {
                state = 'START'
            }
        }
*/
    } 
}

