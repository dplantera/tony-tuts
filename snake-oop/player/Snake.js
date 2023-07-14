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
        this.belly = [];
    }

    get size() {
        return this.game.state.scale;
    }
    get head() {
        return this.body.at(0);
    }
    get tailStart() {
        return this.body.at(1);
    }
    get tailMid() {
        return this.body.slice(1, this.length)
    }
    get tailEnd() {
        return this.body.at(-1);
    }
    get length() {
        return this.body.length;
    }

    /** @param {SnakeInput} input  */
    update(input) {
        if (!this.animation.isPlaying()) {
            this.dir = input.dir;
            this.move();
        }
        this.animation.update(this.game);
    }

    changeDirection(direction) {
        this.dir = direction;
    }

    /** to move the snake we only need to handle the head and the end of the tail - mid segment is static*/
    move() {
        const head = this.head;
        this.removed = this.body.pop();
        const scaledInput = this.dir.scale(this.size);
        const newHead = head.add(scaledInput);
        // add head at the beginning
        this.body.unshift(newHead);
        // digest food
        this.belly = this.belly.map(b => --b).filter(b  => b > 0 )
    }

    draw() {
        this.animation.draw(this.game)
    }
    
    grow() {
        this.belly.push(this.length);
        this.body.unshift(this.head);
    }
}

