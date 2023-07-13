import { Vec2 } from "../Lib.js";

export class SnakeInput {
    static UP = new Vec2(0, -1);
    static DOWN = new Vec2(0, 1);
    static LEFT = new Vec2(-1, 0);
    static RIGHT = new Vec2(1, 0);
    static IDLE = new Vec2(0,0);

    #direction;
    #lastDirection;

    /** @param {Vec2} current  */
    constructor(current) {
        /** player direction @type {Vec2} */
        this.#direction = current;
        /** last player direction @type {Vec2} */
        this.#lastDirection = undefined;
    }

    get dir(){
        return this.#direction;
    }
    get lastDir(){
        return this.#lastDirection;
    }
    /** @param { SnakeInput.UP | SnakeInput.DOWN | SnakeInput.LEFT | SnakeInput.RIGHT } direction  */
    set dir(direction){
        this.#lastDirection = this.direction;
        this.#direction = direction;
    }
    
}
