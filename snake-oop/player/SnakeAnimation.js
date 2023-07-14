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
        if (this.snake.dir.equal(SnakeInput.IDLE)) {
            return;
        }
        this.duration += game.loop.render.delta * this.snake.speed;

        // @optimize: we only need to animate tail and head - mid segment will be same on each frame
        // yet, when the animation ends, we need set a new head and tail - which is kind of the same how snake moves
        // animation feels a little jittery which may be related to total recreation
        this.frames = this.recreateFrames();
        // reset animation when head moved
        if (this.frames.at(0)?.equal(this.snake.pos.current)) {
            this.duration = 0;
        }
    }
    /**
     * @returns {Vec2[]}
     */
    recreateFrames() {
        const body = this.snake.body;
        const frames = []
        if (body.length > 1) {
            const animatedHead = body.at(1).lerp(body.at(0), this.duration);
            frames.push(animatedHead)
        }

        if (body.length > 2) {
            const midSegment = body.slice(1, body.length);
            frames.push(...midSegment);
        }

        if (this.snake.removed) {
            const animatedTail = this.snake.removed.lerp(body.at(-1), this.duration);
            frames.push(animatedTail);
        }

        return frames;
    }

    /** @param {Game} game  */
    draw(game) {
        for (const f of this.frames) {
            game.ctx.fillStyle = "black";
            game.ctx.fillRect(f.x, f.y, this.snake.size, this.snake.size);
        }
    }
}
