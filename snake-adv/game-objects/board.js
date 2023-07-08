import {createGameState} from './state.js'
export function createBoard(){
    console.log("creating board")
    return {
        getCenter,
        randomEmptyPosition,
        randomPosition
    }
}
/** Eine Zufällige freie position auf dem Spielbrett für ein Raster mit definierten Abstand 
 * @param {ReturnType<typeof getGameState>} game 
*/
function getCenter(game) {
    console.log(game)
    const rows = Math.floor(game.level.width.max / game.scale);
    const columns = Math.floor(game.level.height.max / game.scale);
    return { x: Math.floor(0.5 * rows) * game.scale, y: Math.floor(0.5 * columns) * game.scale }
}

/** Eine Zufällige freie position auf dem Spielbrett für ein Raster mit definierten Abstand 
 * @param {ReturnType<typeof createGameState>} game 
*/
function randomEmptyPosition(game) {
    let newPos = randomPosition(game);
    let isBlockedBySnake = isPositionBlocked(newPos, game.snake.body);
    let isBlockedByPickup = isPositionBlocked(newPos, Object.values(game.pickUpItems));

    while (isBlockedBySnake || isBlockedByPickup) {
        newPos = randomPosition(game);
        isBlockedBySnake = isPositionBlocked(newPos, game.snake.body);
    }
    return newPos
}

/** @param {ReturnType<typeof getGameState>} game */
function randomPosition(game) {
    const rows = Math.floor(game.level.width.max / game.scale);
    const columns = Math.floor(game.level.height.max / game.scale);
    return { x: Math.floor(Math.random() * rows) * game.scale, y: Math.floor(Math.random() * columns) * game.scale }
}

/** Gibt an, ob eine bestimmte position (x, y) auf einer Auswahl von belegten position liegt [(x,y), (x,y)] */
function isPositionBlocked(pos, belegtePositionen) {
    for (let belegtePosition of belegtePositionen) {
        if (pos.x === belegtePosition.x && pos.y === belegtePosition.y) {
            return true;
        }
    }
    return false;
}