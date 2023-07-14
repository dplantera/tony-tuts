
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
    mid(vec2){
        return new Vec2(
            (this.x + vec2.x ) / 2,
            (this.y + vec2.y ) / 2,
        )
    }
    scale(scalar){
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    equal(vec2){
        return this.x === vec2.x && this.y === vec2.y;
    }

    lerp(endVec, fraction){
        return new Vec2(
            cap(endVec.x, lerp(this.x, endVec.x, fraction), endVec.x < this.x),
            cap(endVec.y, lerp(this.y, endVec.y, fraction), endVec.y < this.y),
        )
    }
}

function lerp(start, end, fraction){
    return start + (end - start) * fraction;
}

function cap(max, current, negativ){
    return negativ ? Math.max(current, max) : Math.min(current, max);
}