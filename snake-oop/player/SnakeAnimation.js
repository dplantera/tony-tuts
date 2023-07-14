import { Game } from "../game/Game.js";
import { Snake } from "./Snake.js";
import { Vec2 } from "../Lib.js";
import { SnakeInput } from "./SnakeInput.js";


export class SnakeAnimation {

    /** @param {Snake} snake  */
    constructor(snake) {
        this.snake = snake;
        this.duration = 0;

        // head
        this.posCurrent = Vec2.fromVec2(this.snake.pos.last)
    }

    isPlaying() {
        return this.duration != 0;
    }

    /** @param {Game} game  */
    update(game) {
        if(this.snake.dir === SnakeInput.IDLE){
            return;
        }

        this.duration += game.loop.render.delta * this.snake.speed;
        this.posCurrent = this.snake.pos.last.lerp(this.snake.pos.current, this.duration);
        if(this.posCurrent.equal(this.snake.pos.current)){
            this.duration = 0;
        }
    }

    /** @param {Game} game  */
    draw(game) {
        game.ctx.fillStyle = "black";
        game.ctx.fillRect(this.posCurrent.x, this.posCurrent.y, this.snake.size, this.snake.size);
    }
}
