import { widthArea, heightArea, canvas, context } from "./consts.js";
import { modalGame } from "./controls.js";
import { resetScoreBtn } from "./modal.js";
import { win } from "./consts.js";
import { snake, apple, obstacle, grid, gameAreaSettings } from "./interfaces.js";
export const progressValue = document.querySelector(".progress-value");
const modalScore = document.querySelector('.modal-score');
export const maxScore = document.querySelector(".max-score__value-content");
export const maxScoreContainer = document.querySelector(".max-score");
export const wrapper = document.querySelector(".wrapper");
const currentMaxScore = document.querySelector(".modal-game__score-content");

class Apple {
  setApple() {
    let randomX = getRandomInt(0, widthArea) * grid;
    let randomY = getRandomInt(0, heightArea) * grid;

    let areaApple = [{ x: apple.x, y: apple.y }];

    let areaSnakes = [...snake.cells];

    let allArea = areaApple.concat(areaSnakes);

    for (let i = 0; i < allArea.length; i++) {
      let elX = allArea[i].x;
      let elY = allArea[i].y;

      if (elX !== randomX && randomY !== elY) {
        apple.x = randomX;
        apple.y = randomY;
      } else {
        do {
          randomX = getRandomInt(0, widthArea) * grid;
          randomY = getRandomInt(0, heightArea) * grid;
        } while (elX !== randomX && randomY !== elY);
      }
    }
    return new Obstacle().setObstacles(allArea);
  }

  setNewPosition () {
    let randomX = getRandomInt(0, widthArea) * grid;
    let randomY = getRandomInt(0, heightArea) * grid;
    apple.x = randomX;
    apple.y = randomY;
  }
}

class Obstacle {
  setObstacles(allArea) {
    if(obstacle.cells.length === 20) return;
    let randomX = getRandomInt(0, widthArea) * grid;
    let randomY = getRandomInt(0, heightArea) * grid;

    for (let i = 0; i < allArea.length; i++) {
      let elX = allArea[i].x;
      let elY = allArea[i].y;
        
      if (elX !== randomX && randomY !== elY) {
        obstacle.x = randomX;
        obstacle.y = randomY;
        return obstacle.cells.unshift({ x: obstacle.x, y: obstacle.y });
      } else {
        do {
          randomX = getRandomInt(0, widthArea) * grid;
          randomY = getRandomInt(0, heightArea) * grid;
        } while (elX !== randomX && randomY !== elY);
      }
    }
  }

  setNewPosition = () => obstacle.cells = [];
}

export class GameArea {
  constructor(maxScore, speed) {
    this.maxScore = maxScore;
    this.speed = speed;
  }

  getRandomInt() {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  setMaxScore() {
    if (this.maxScore === null) {
      modalScore.innerHTML = 0
      return maxScoreContainer.style.display = "none";
    }
    maxScoreContainer.style.display = "flex";
    maxScore.innerHTML = this.maxScore;
    modalScore.innerHTML = this.maxScore
  }

  setLoseGame() {
    modalGame.classList.toggle("modal-game--active", true);
    currentMaxScore.textContent = progressValue.textContent;
    progressValue.innerHTML = snake.progress;
    modalScore.innerHTML = snake.progress

    if (localStorage.getItem("userMaxScore") < snake.progress) {
      localStorage.setItem("userMaxScore", snake.progress);
      resetScoreBtn.disabled = false;
    }

    localStorage.setItem("userMaxScore", snake.progress);
    new User(snake.progress).getLocalMaxScore();

    snake.progress = 0;
    snake.x = getRandomInt(0, widthArea) * grid;
    snake.y = getRandomInt(0, heightArea) * grid;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;

    maxScoreContainer.classList.toggle("max-score--active", false);
    wrapper.classList.toggle("wrapper-back", false);

    return this.resetGameArea();
  }

  resetGameArea() {
    new Apple().setNewPosition();
    new Obstacle().setNewPosition();
  }

  setGameAreaSpeed(speed) {
    gameAreaSettings.speed = +speed
    return localStorage.setItem('gameSpeed', speed)
  }
}

export class User {
  constructor(progress) {
    this.progress = progress;
  }

  getLocalMaxScore() {
    let maxUserScore = localStorage.getItem("userMaxScore");
    if (!maxUserScore) return null;

    if (maxUserScore < this.progress) {
      maxScoreContainer.classList.toggle("max-score--active", true);
      return new GameArea(this.progress).setMaxScore();
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let count = 0;
export function loop() {
  let myReq = requestAnimationFrame(loop);

  if (++count < gameAreaSettings.speed) return;
  if (win === snake.progress) alert("victory!");
  if (snake.paused === true) return;
  
  progressValue.innerHTML = `${snake.progress}`;
  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x >= canvas.width) snake.x = 0;
  if (snake.x < 0) snake.x = canvas.width - grid;
  if (snake.y >= canvas.height) snake.y = 0;
  if (snake.y < 0) snake.y = canvas.height;
  if (snake.y < 0) snake.y = canvas.height - grid;
  
  snake.cells.unshift({ x: snake.x, y: snake.y });

  let img = document.getElementById("apple");
  context.drawImage(img, apple.x, apple.y, grid + 2, grid + 2);

  context.fillStyle = obstacle.color;
  for (let i = 0; i < obstacle.cells.length; i++) {
    const img = document.getElementById("wall");
    context.drawImage(img, obstacle.cells[i].x, obstacle.cells[i].y, grid + 1, grid + 4)
  }

  context.fillStyle = snake.color;

  snake.cells.forEach((cell, idx) => {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;

      new Apple().setApple();

      snake.progress += snake.progressCount;

      if (new User().getLocalMaxScore() === null) return;

      if (snake.progress > new User(snake.progress).getLocalMaxScore()) {
        return new User(snake.progress).getLocalMaxScore();
      }
    }

    obstacle.cells.forEach(obstacle => {
      if(obstacle.x == cell.x && obstacle.y === cell.y) {
        window.cancelAnimationFrame(myReq);
        new GameArea().setLoseGame();
      }
    })

    for (let i = idx + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        window.cancelAnimationFrame(myReq);
        new GameArea().setLoseGame();
      }
    }
  });

  if (snake.cells.length > snake.maxCells) snake.cells.pop();
}