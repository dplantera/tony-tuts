export const sounds = {
    "snake-eat-food" : "snake-eat-food",
    "game-over-highscore" : "game-over-highscore",
    "snake-eat-special" : "snake-eat-special",
    "ambients": "ambients"
}

const soundPaths = {
    "snake-eat-food" : {src: "./assets/sounds/snake-eat-food.wav"},
    "game-over-highscore" : {src: "./assets/sounds/game-over-highscore.wav"},
    "snake-eat-special" : {src: "./assets/sounds/snake-eat-special.wav"},
    "ambients" : {src: "./assets/sounds/ambients.mp3", loop: true},
};

const soundCache = {};

export function createSoundsManager(){
    initSounds();
    return {
        get map(){return sounds},
        getSound
    }
}

/** @returns {Sound} */
function  getSound(key){
    return soundCache[key];
}

function initSounds(){
    Object.keys(sounds).forEach(key => {
        const soundPath = soundPaths[key];
        soundCache[key] = new Sound(soundPath.src, {loop: soundPath.loop} );
    });
}

export class Sound {
    constructor(src, options) {
        /** @type {HTMLAudioElement} */
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.sound.volume = 1;
    }
    get isPlaying(){
        return this.sound.paused ?? false;
    }
    play(){
        this.sound.play();
    }
    pause(){
        this.sound.pause();
    }
    speed(speed){
        this.sound.playbackRate = speed;
    }
    stop(){
        this.sound.pause();
        this.sound.currentTime = 0;
    }
    setVolume(volume){
        this.sound.volume = volume;
    }
    toggleLoop(loop){
        const current = this.sound.getAttribute("loop") ?? false;
        this.sound.setAttribute("loop", loop ?? !current)
    }
} 