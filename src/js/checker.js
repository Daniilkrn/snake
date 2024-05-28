import { getRandomInt } from "./app";
import { heightArea, widthArea } from "./consts";
import { grid, obstacle, snake } from "./interfaces";

export function checker() {
  let randomX = getRandomInt(0, widthArea) * grid;
  let randomY = getRandomInt(0, heightArea) * grid;

  let allArea = snake.cells
    .concat(obstacle.cells)
    .concat({ x: apple.x, y: apple.y });

  const check = allArea.find((obj) => {
    return obj.x === randomX && obj.y === randomY;
  });

  if (check) return checker();
  return {randomX, randomY}
}
