import { GameLoop } from "./game/GameLoop.js";
import { Game } from "./game/Game.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const gameLoop = new GameLoop();
const game = new Game(gameLoop, ctx);

gameLoop.start();