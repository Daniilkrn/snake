import { snake } from "./interfaces.js";
import { grid } from "./interfaces.js";
import { apple } from "./interfaces.js";

export const canvasWindow  = document.getElementById('game-window');
export const widthArea = canvasWindow.width / grid;
export const heightArea = canvasWindow.height / grid;
export const square = (canvasWindow.width * canvasWindow.height) / grid;
export const win = (square / grid - snake.initialCell - 1 - apple.length) * snake.progressCount;
export const canvas = document.getElementById("game-window");
export const context = canvas.getContext("2d");