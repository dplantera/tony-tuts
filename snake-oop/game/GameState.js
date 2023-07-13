import { Player } from "../player/Player.js";

export class GameState {

    constructor({ width, height } = { width: 350, height: 250 }) {
        this.player = undefined;
        this.pickUps = [];
        this.width = width;
        this.height = height;
    }
    
    /** @param {Player} player  */
    addPlayer(player){
        this.player = player;
    }
}