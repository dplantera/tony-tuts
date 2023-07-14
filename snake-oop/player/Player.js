import { Snake } from "./Snake.js";
import { SnakeAnimation } from "./SnakeAnimation.js";
import { SnakeInput } from "./SnakeInput.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.input = new SnakeInput(SnakeInput.RIGHT)
        this.snake = new Snake(game);
        this.animation = new SnakeAnimation(this.snake);
        addEventListener("keydown", this.handleInput.bind(this));
        addEventListener("mousedown", () => {
            for(let i=0; 100> i; i++){
                this.snake.grow()
            }
        });
        

        // debug
        this.snake.grow();
    }

    update(){
        if(!this.animation.isPlaying()){
            this.snake.update(this.input);
        }
        this.animation.update(this.game);
    }

    draw(){
        this.animation.draw(this.game);
        this.snake.draw(this.game);
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
        if (key === ' ') {
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

