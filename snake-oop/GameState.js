export class GameState {

    constructor({ width, height } = { width: 350, height: 250 }) {
        this.snake = undefined;
        this.pickUps = [];
        this.width = width;
        this.height = height;
    }

}