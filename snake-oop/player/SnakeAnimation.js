import { Game } from "../game/Game.js";
import { Snake } from "./Snake.js";
import { Vec2 } from "../Lib.js";


export class SnakeAnimation {

    /** @param {Snake} snake  */
    constructor(snake) {
        this.head = new SnakeHeadAnimation(snake);
        this.tail = new SnakeTailAnimation(snake);
    }

    isPlaying() {
        return !this.head.reachedEnd();
    }

    end() {
        this.head.end();
        this.tail.end();
    }

    /** @param {Game} game  */
    update(game) {
        this.tail.update(game);
        this.head.update(game);

    }

    /** @param {Game} game  */
    draw(game) {
        this.head.draw(game);
        this.tail.draw(game);
    }
}



export class SnakeHeadAnimation {

    /** @param {Snake} snake  */
    constructor(snake) {
        this.snake = snake;
        this.duration = 0;
        this.fps = 60;

        // head
        this.posStart = Vec2.fromVec2(this.snake.pos.current);
        this.posCurrent = Vec2.fromVec2(this.posStart);
        this.posEnd = Vec2.fromVec2(this.snake.pos.next);
    }

    reachedEnd() {
        return this.posCurrent.equal(this.posEnd);
    }

    isPlaying() {
        return !this.posCurrent.equal(this.posStart) && !this.reachedEnd();
    }

    /** @param {Game} game  */
    update(game) {
        if(this.reachedEnd()){
            this.posStart = Vec2.fromVec2(this.snake.pos.current);
            this.posCurrent = Vec2.fromVec2(this.posStart);
            this.posEnd = Vec2.fromVec2(this.snake.pos.next);   
        }
        this.duration += game.loop.render.delta;
        this.posCurrent = this.posCurrent.add(this.snake.dir);
    }

    /** @param {Game} game  */
    draw(game) {
        if (this.duration >= 1 / this.fps) {
            // head
            game.ctx.fillStyle = "black";
            game.ctx.fillRect(this.posCurrent.x, this.posCurrent.y, Snake.size, Snake.size);
            this.duration = 0;
        }
    }
}


export class SnakeTailAnimation {

    /** @param {Snake} snake  */
    constructor(snake) {
        this.snake = snake;
        this.duration = 0;
        this.fps = 60;

        this.posStart = Vec2.fromVec2(this.snake.pos.last);
        this.posCurrent = Vec2.fromVec2(this.posStart);
        this.posEnd = Vec2.fromVec2(this.snake.pos.current);
        this.start = false;
    }
    start(){
        this.hasStarted = true;
    }
    reachedEnd() {
        return this.posCurrent.equal(this.posEnd);
    }

    isPlaying() {
        return !this.reachedEnd();
    }

    /** @param {Game} game  */
    update(game) {
        if(!this.hasStarted){
            return;
        }
        if(this.reachedEnd()){
            this.posStart = Vec2.fromVec2(this.snake.pos.current);
            this.posCurrent = Vec2.fromVec2(this.posStart);
            this.posEnd = Vec2.fromVec2(this.snake.pos.next);   
        }
        this.duration += game.loop.render.delta;
        this.posCurrent = this.posCurrent.add(this.snake.dir);
    }

    /** @param {Game} game  */
    draw(game) {
        if(!this.hasStarted){
            return;
        }

        if (this.duration >= 1 / this.fps) {
            // head
            game.ctx.fillStyle = "blue";
            game.ctx.fillRect(this.posCurrent.x, this.posCurrent.y, Snake.size, Snake.size);
            this.duration = 0;
        }
    }
}