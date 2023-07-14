import { Snake } from "./Snake.js";
import { SnakeAnimation } from "./SnakeAnimation.js";
import { SnakeInput } from "./SnakeInput.js";

export class Player {
    constructor() {
        this.input = new SnakeInput(SnakeInput.RIGHT)
        this.snake = new Snake(this.input);
        this.animation = new SnakeAnimation(this.snake);
        addEventListener("keydown", this.handleInput.bind(this));
    }

    update(game){
        if(!this.animation.isPlaying()){
            this.snake.update(this.input);
        }
        this.animation.update(game);
    }

    draw(game){
        this.animation.draw(game);
        this.snake.draw(game);
    }

    changePlayerDirection(direction){
        this.input.dir = direction;
    }

    /** @param {KeyboardEvent} e */
    handleInput(e) {
        e.preventDefault();
        console.log("pressed", e.key)
        const key = e.key;
        const playerDirection = this.input.dir;
        if (key === 'a' && (playerDirection != SnakeInput.RIGHT)) {
            this.changePlayerDirection(SnakeInput.LEFT);
        }
        if (key === 'd' && (playerDirection != SnakeInput.LEFT)) {
            this.changePlayerDirection(SnakeInput.RIGHT);
        }
        if (key === 'w' && (playerDirection != SnakeInput.DOWN)) {
            this.changePlayerDirection(SnakeInput.UP);
        }
        if (key === 's' && (playerDirection != SnakeInput.UP)) {
            this.changePlayerDirection(SnakeInput.DOWN);
        }
        if (key === ' ' && (playerDirection != SnakeInput.UP)) {
            this.changePlayerDirection(SnakeInput.IDLE);
        }
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

