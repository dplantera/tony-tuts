import { GameLoop } from "./GameLoop.js";
import { GameState } from "./GameState.js";
import { Player } from "../player/Player.js";

export class Game {
    /**
     *  @param {GameLoop} gameLoop 
     *  @param {CanvasRenderingContext2D} ctx 
     */
    constructor(gameLoop, ctx) {
        this.loop = gameLoop;
        this.ctx = ctx;
        this.state = new GameState({ width: 350, height: 250 });

        this.loop.onStart = this.start.bind(this);
        this.loop.onDraw = this.draw.bind(this);
        this.loop.onUpdate = this.update.bind(this);

        this.log = false ? console.log : () => {};
    }

    start(){
        this.ctx.canvas.width = this.state.width;
        this.ctx.canvas.height = this.state.height;
        this.state.addPlayer(new Player(this));
        this.log("update start")
    }

    update() {
        this.log("update game")
        this.updateState(this.state);
    }

    draw(){
        this.log("draw game")
        // render level
        let xStart = 0, yStart = 0, xEnd = this.state.width, yEnd = this.state.height;
        this.ctx.clearRect(xStart, yStart, xEnd, yEnd);
        this.ctx.strokeRect(xStart, yStart, xEnd, yEnd);

        this.renderState(this.state);
    }

    updateState(state){
        state.player.update(this);
    }

    renderState(state){
        state.player.draw(this);
    }
}