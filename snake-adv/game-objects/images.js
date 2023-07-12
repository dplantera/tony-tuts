/** @type {Image} */
let imageMap;
export const snakeImage = {
    up: [],
    down: [],
    left: [],
    right: []
}

export function initImage(){
    imageMap = new Image();
    imageMap.src = "./assets/images/snake_map.png";
    return imageMap;
}