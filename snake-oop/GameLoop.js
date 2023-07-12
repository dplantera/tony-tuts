/**
----|----|----|----
    1    2    3
 */
export class GameLoop {

    constructor({onUpdate, onDraw, onStart}={}) {
        this.onUpdate = onUpdate;
        this.onDraw = onDraw;
        this.onStart = onStart;
        this.render = {
            current : 0,
            last : 0,
            delta : 0,
            fps : 1,
        }
        this.log = false ? console.log : () => {};
    }
    
    start(){
        this.log("starting game loop", this);
        this.onStart?.();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(currentRenderMS) {
        this.render.current = currentRenderMS / 1000;
        this.render.delta = this.render.current - this.render.last;
        
        if (this.render.delta >= 1 / this.render.fps) {
            this.update(this);
            this.draw(this);
            this.render.last = this.render.current;
        }
        // recursion
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    update() {
        this.log("update", this);
        this.onUpdate?.();
    }

    draw() {
        this.log("draw", this);
        this.onDraw?.();
    }
}