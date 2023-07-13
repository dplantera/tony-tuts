
/**
 * Immutable Vector in a 2d space
 * @example
```
| (0, 1) := up   
x     
|   (1, 0) := right
0 --x----------
| 
x
| (0,-1) := down
```
*/
export class Vec2 {
    #x;
    #y;
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }
    get x(){
        return this.#x;
    }
    get y(){
        return this.#y;
    }
    static fromVec2(vec2){
        return new Vec2(vec2.x, vec2.y);
    }

    add(vec2) {
        return new Vec2(this.x + vec2.x, this.y + vec2.y);
    }
    scale(scalar){
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    equal(vec2){
        return this.x === vec2.x && this.y === vec2.y;
    }
}