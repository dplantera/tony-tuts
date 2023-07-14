import { Game } from "../game/Game.js";
import { Snake } from "./Snake.js";
import { Vec2 } from "../Lib.js";
import { SnakeInput } from "./SnakeInput.js";

export class SnakeAnimation {

    /** @param {Snake} snake  */
    constructor(snake) {
        this.snake = snake;
        this.duration = 0;
        this.frames;
    }

    isPlaying() {
        return this.duration != 0;
    }

    /** @param {Game} game  */
    update(game) {
        this.duration += game.loop.render.delta * this.snake.speed;

        // @optimize: we only need to animate tail and head - mid segment will be same on each frame
        // yet, when the animation ends, we need set a new head and tail - which is kind of the same how snake moves
        // animation feels a little jittery which may be related to total recreation
        this.frames = this.recreateFrames();
        // reset animation when head moved
        if (this.frames.at(0)?.equal(this.snake.head)) {
            this.duration = 0;
        }
    }
    /**
     * @returns {Vec2[]}
     */
    recreateFrames() {
        const snake = this.snake;
        const frames = []
        if (snake.length > 1) {
            const animatedHead = snake.tailStart.lerp(snake.head, this.duration);
            frames.push(animatedHead)
        }

        if (snake.length > 2) {
            frames.push(...snake.tailMid);
        }

        if (snake.removed) {
            const animatedTail = snake.removed.lerp(snake.tailEnd, this.duration);
            frames.push(animatedTail);
        }

        return frames;
    }

    /** @param {Game} game  */
    draw(game) {
        for (const f of this.snake.belly) {
            let pos = this.snake.body.at(- f);
            let size = this.snake.size;
          
            game.ctx.fillStyle = "blue";
            game.ctx.fillRect(pos.x - size/2, pos.y - size/2, size * 2 , size * 2);
            game.ctx.fill();
        }

        for (const f of this.frames) {
            game.ctx.beginPath();
            game.ctx.fillStyle = "black";
            game.ctx.fillRect(f.x, f.y, this.snake.size, this.snake.size);
        }
    }
}
