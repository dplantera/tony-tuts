import { SnakeInput } from "./SnakeInput.js";
import { Game } from "../game/Game.js";
import { Vec2 } from "../Lib.js";

export class Snake {
    static size = 10;

    constructor() {
        this.pos = {current: new Vec2(0, 0), last: new Vec2(0,0), next: new Vec2(0,0)}
        this.dir = SnakeInput.IDLE;
    }

    /** @param {SnakeInput} input  */
    update(input) {
        this.dir = input.dir;
        const scaledInput = input.dir.scale(Snake.size);
        const newPos = this.pos.current.add(scaledInput)

        this.pos.last = this.pos.current;
        this.pos.current = newPos;
        this.pos.next = newPos.add(scaledInput);
    }

    /** @param {Game} game  */
    draw(game) {
        game.ctx.fillStyle = "black";
        game.ctx.fillRect(this.pos.current.x, this.pos.current.y, Snake.size, Snake.size)
    }
}

