import { widthArea, heightArea, canvas, context } from "./consts.js";
import { modalGame } from "./controls.js";
import { resetScoreBtn } from "./modal.js";
import { win } from "./consts.js";
import {snake,apple,obstacle,grid,gameAreaSettings,boosts} from "./interfaces.js";
import { checker } from "./checker.js";

const progressTitle = document.querySelector('.progress-title')
export const progressValue = document.querySelector(".progress-value");
const modalScore = document.querySelector(".modal-score");
export const maxScore = document.querySelector(".max-score__value-content");
export const maxScoreContainer = document.querySelector(".max-score");
export const wrapper = document.querySelector(".wrapper");
const currentMaxScore = document.querySelector(".modal-game__score-content");

class Apple {
  setApple() {
    snake.progress += snake.progressCount;
    boosts.counter += 1;

    let randomX = getRandomInt(0, widthArea) * grid;
    let randomY = getRandomInt(0, heightArea) * grid;

    let allArea = snake.cells
      .concat(obstacle.cells)
      .concat({ x: apple.x, y: apple.y });
    const a = allArea.find((obj) => {
      return obj.x === randomX && obj.y === randomY;
    });

    if (a) return this.setApple();
    apple.x = randomX;
    apple.y = randomY;

    if (boosts.counter >= 8) new Boosts(true).setBoost2X();

    return new Obstacle().setObstacles(allArea);
  }

  setNewPosition() {
    let randomX = getRandomInt(0, widthArea) * grid;
    let randomY = getRandomInt(0, heightArea) * grid;
    apple.x = randomX;
    apple.y = randomY;
  }
}

class Obstacle {
  setObstacles(allArea) {
    if (obstacle.cells.length === obstacle.maxSize) return;
    if (snake.progress % 2 !== 0) return;
    let randomX = getRandomInt(0, widthArea) * grid;
    let randomY = getRandomInt(0, heightArea) * grid;

    const check = allArea.find((obj) => {
      return obj.x === randomX && obj.y === randomY;
    });

    if (check) return this.setObstacles(allArea);
    obstacle.x = randomX;
    obstacle.y = randomY;
    obstacle.cells.unshift({ x: obstacle.x, y: obstacle.y });
  }

  setNewPosition = () => (obstacle.cells = []);
}

class Boosts {
  constructor(status) {
    this.status = status;
  }
  setBoost2X() {
    const randomResult = checker();
    boosts.double.x = randomResult.randomX;
    boosts.double.y = randomResult.randomY;
    boosts.setStatus = true;
    return boosts.counter = 0;
  }

  setBonusTips() {
    boosts.setStatus = false;
    snake.progressCount = 6;
    const bonus = document.createElement('p');
    bonus.className = 'bonus-tip';
    bonus.innerHTML = '2X time:&nbsp';
    progressTitle.appendChild(bonus)

    setInterval(() => {
      if(c > 0){
        c -= 1;
        countText.innerHTML = c + 's';
      }
    }, 1000);

    setTimeout(() => {
      snake.progressCount = 3;
      progressTitle.removeChild(bonus);
    }, boosts.double.timeEnding);

    let c = boosts.double.timeEnding / 1000;
    let countText = document.createElement('span');
    bonus.appendChild(countText);
  }
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
      modalScore.innerHTML = 0;
      return (maxScoreContainer.style.display = "none");
    }
    maxScoreContainer.style.display = "flex";
    maxScore.innerHTML = this.maxScore;
    modalScore.innerHTML = this.maxScore;
  }

  setLoseGame() {
    modalGame.classList.toggle("modal-game--active", true);
    currentMaxScore.textContent = progressValue.textContent;
    progressValue.innerHTML = snake.progress;
    modalScore.innerHTML = snake.progress;

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
    gameAreaSettings.speed = +speed;
    return localStorage.setItem("gameSpeed", speed);
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

export function getRandomInt(min, max) {
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

  if(boosts.getStatus){
    context.fillStyle = 'white';
    context.fillRect(boosts.double.x, boosts.double.y, grid - 1, grid - 1);
    context.fillStyle = 'orange';
    context.fillText('X2',boosts.double.x + 3, boosts.double.y + 12, grid);
  }

  context.fillStyle = obstacle.color;
  for (let i = 0; i < obstacle.cells.length; i++) {
    const img = document.getElementById("wall");
    context.drawImage(
      img,
      obstacle.cells[i].x,
      obstacle.cells[i].y,
      grid + 1,
      grid + 4
    );
  }

  context.fillStyle = snake.color;

  snake.cells.forEach((cell, idx) => {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;

      new Apple().setApple();

      if (new User().getLocalMaxScore() === null) return;

      if (snake.progress > new User(snake.progress).getLocalMaxScore()) {
        return new User(snake.progress).getLocalMaxScore();
      }
    }
    obstacle.cells.forEach((obstacle) => {
      if (obstacle.x == cell.x && obstacle.y === cell.y) {
        window.cancelAnimationFrame(myReq);
        new GameArea().setLoseGame();
      }
    });

    for (let i = idx + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        window.cancelAnimationFrame(myReq);
        new GameArea().setLoseGame();
      }
    }
  });

  snake.cells.every(cell => {
    if(cell.x === boosts.double.x && cell.y === boosts.double.y){
      return new Boosts().setBonusTips()
    }
  })

  if (snake.cells.length > snake.maxCells) snake.cells.pop();
}