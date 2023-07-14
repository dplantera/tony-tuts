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
        this.moveHead();
    }

    changeDirection(direction){
        this.dir = direction;
    }

    moveHead(){
        const scaledInput = this.dir.scale(Snake.size);
        this.pos.last = this.pos.current;
        this.pos.current = this.pos.next;
        this.pos.next = this.pos.current.add(scaledInput); 
    }

    /** @param {Game} game  */
    draw(game) {
        //game.ctx.fillStyle = "black";
        //game.ctx.fillRect(this.pos.current.x, this.pos.current.y, Snake.size, Snake.size)
    }
}

