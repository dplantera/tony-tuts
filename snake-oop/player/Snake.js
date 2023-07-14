import { SnakeInput } from "./SnakeInput.js";
import { Game } from "../game/Game.js";
import { Vec2 } from "../Lib.js";

export class Snake {

    /** @param {Game} game  */
    constructor(game) {
        this.game = game;
        this.dir = SnakeInput.IDLE;
        this.speed = 5;
        this.pos = { current: new Vec2(0, 0), last: new Vec2(0, 0) };
        this.body = [Vec2.fromVec2(this.pos.current)];
     }

    get size() {
        return this.game.state.scale;
    }

    /** @param {SnakeInput} input  */
    update(input) {
        this.dir = input.dir;
        this.moveHead();
    }

    changeDirection(direction) {
        this.dir = direction;
    }

    moveHead() {
        if(this.dir === SnakeInput.IDLE){
            return;
        }
        // bewege alle segemente um eins
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i] = this.body[i - 1];
        }
        const scaledInput = this.dir.scale(this.size);
        this.pos.last = this.pos.current;
        this.pos.current = this.pos.current.add(scaledInput);
        this.body[0] = this.pos.current;
    }

    draw() {
        // @check: the animation is drawing - maybe it should be part of snake then

        for(const b of this.body.slice(1)){
            this.game.ctx.fillStyle = "grey";
            this.game.ctx.fillRect(b.x, b.y, this.size, this.size)
        }
      
    }

    grow(){
        const scaledInput = this.dir.scale(this.size);
        this.body.push({current: this.pos.current, last: this.pos.current});
    }
}

