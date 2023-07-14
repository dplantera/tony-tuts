import { Game } from "../game/Game.js";
import { Snake } from "./Snake.js";
import { Vec2 } from "../Lib.js";
import { SnakeInput } from "./SnakeInput.js";


export class SnakeAnimation {

    /** @param {Snake} snake  */
    constructor(snake) {
        this.snake = snake;
        this.duration = 0;

        this.frames = [];
    }

    isPlaying() {
        return this.duration != 0;
    }

    /** @param {Game} game  */
    update(game) {
        if (this.snake.dir.equal(SnakeInput.IDLE)) {
            return;
        }
        const body = this.snake.body;
        this.duration += game.loop.render.delta * this.snake.speed;
        this.frames = this.snake.removed
            ? [this.snake.removed.lerp(body.at(-1), this.duration)]
            : [];
        for (let i = body.length - 1; i > 0; i--) {
            this.frames.push(body.at(i).lerp(body.at(i-1), this.duration));
        }
        
        if (this.frames.at(-1).equal(this.snake.pos.current)) {
            this.duration = 0;
        }

    }

    /** @param {Game} game  */
    draw(game) {
        for(const f of this.frames){
            game.ctx.fillStyle = "black";
            game.ctx.fillRect(f.x, f.y, this.snake.size, this.snake.size);
        }
    }
}
