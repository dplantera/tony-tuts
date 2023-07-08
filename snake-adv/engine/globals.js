let fps = 60;
let deltaTime;

export function globals(){
    return {
        get fps() {return fps},
        set fps(value) { fps = value},
        get deltaTime() {return deltaTime},
        set deltaTime(value) { deltaTime = value},
    }
}