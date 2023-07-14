import { SnakeInput } from "./SnakeInput.js";
import { SnakeAnimation } from "./SnakeAnimation.js";
import { Game } from "../game/Game.js";
import { Vec2 } from "../Lib.js";

export class Snake {

    /** @param {Game} game  */
    constructor(game) {
        this.game = game;
        this.dir = SnakeInput.IDLE;
        this.speed = 5;

        this.pos = { current: new Vec2(0, 0) };
        this.body = [Vec2.fromVec2(this.pos.current)];
        /** holds the dropped tail segment @type {Vec2}*/
        this.removed;

        this.animation = new SnakeAnimation(this);
     }

    get size() {
        return this.game.state.scale;
    }
    get head(){
        return this.body.at(0);
    }
    get tailStart(){
        return this.body.at(1);
    }
    get tailMid(){
        return this.body.slice(1, this.length)
    }
    get tailEnd(){
        return this.body.at(-1);
    }
    get length(){
        return this.body.length;
    }

    /** @param {SnakeInput} input  */
    update(input) {
        if(!this.animation.isPlaying()){
            this.dir = input.dir;
            this.moveHead();
        }
        this.animation.update(this.game);
    }

    changeDirection(direction) {
        this.dir = direction;
    }

    moveHead() {
        if(this.dir === SnakeInput.IDLE){
            return;
        }
        // bewege alle segemente um eins
        this.removed = this.tailEnd;
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i] = this.body[i - 1];
        }
        const scaledInput = this.dir.scale(this.size);
        this.body[0] = Vec2.fromVec2(this.head.add(scaledInput));
    }

    draw() {
        this.animation.draw(this.game)
    }

    grow(){
        const scaledInput = this.dir.scale(this.size);
        this.body.push(this.tailEnd);
    }
}

