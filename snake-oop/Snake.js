import { SnakeInput } from "./SnakeInput.js";
import { Game } from "./Game.js";
import { Vec2 } from "./Lib.js";

export class Snake {
    static size = 10;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    /** @param {SnakeInput} input  */
    update(input) {
        console.log("update snake", input)
        const scaledInput = input.dir.scale(Snake.size);
        const newPos = new Vec2(this.x, this.y).add(scaledInput)
        this.x = newPos.x;
        this.y = newPos.y;
    }

    /** @param {Game} game  */
    draw(game) {
        //console.log("draw snake", game)

        game.ctx.fillStyle = "black";
        game.ctx.fillRect(this.x, this.y, Snake.size, Snake.size)
    }
}

