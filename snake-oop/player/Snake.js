import { SnakeInput } from "./SnakeInput.js";
import { Game } from "../game/Game.js";
import { Vec2 } from "../Lib.js";

export class Snake {

    /** @param {Game} game  */
    constructor(game) {
        this.game = game;
        this.dir = SnakeInput.IDLE;
        this.speed = 5;
        this.body = [{ current: new Vec2(0, 0), last: new Vec2(0, 0) }];
     }

    get pos(){
        return this.body[0];
    }
    get size() {
        return this.game.state.scale;
    }

    /** @param {SnakeInput} input  */
    update(input) {
        console.log(this.body);
        this.dir = input.dir;
        this.moveHead();
    }

    changeDirection(direction) {
        this.dir = direction;
    }

    moveHead() {
        const scaledInput = this.dir.scale(this.size);
        this.pos.last = this.pos.current;
        this.pos.current = this.pos.current.add(scaledInput);
/*
             
        // bewege alle segemente um eins
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i] = this.body[i - 1];
        }
        */
    }

    draw() {
        // @check: the animation is drawing - maybe it should be part of snake then
/*
        for(const b of this.body.slice(1)){
            this.game.ctx.fillStyle = "black";
            this.game.ctx.fillRect(b.current.x, b.current.y, this.size, this.size)
        }
        */
    }

    grow(){
        const scaledInput = this.dir.scale(this.size);
        this.body.push({current: this.pos.current, last: this.pos.current});
    }
}

