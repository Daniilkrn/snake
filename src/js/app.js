import { widthArea, heightArea } from "./consts.js"
import { modalGame } from "./controls.js"
import { resetScoreBtn } from "./modal.js";
import { canvasWindow, square } from "./consts.js";
export const progressValue = document.querySelector('.progress-value');
export const maxScore = document.querySelector('.max-score__value-content');
export const maxScoreContainer = document.querySelector('.max-score');
export const wrapper = document.querySelector('.wrapper')
const currentMaxScore = document.querySelector('.modal-game__score-content');

class Apple {
    constructor() {
    }

    setApple() {
        let randomX = getRandomInt(0, widthArea) * grid;
        let randomY = getRandomInt(0, heightArea) * grid;

        let areaApple = [{ x: apple.x, y: apple.y }]

        let areaSnakes = [...snake.cells]

        let allArea = areaApple.concat(areaSnakes);

        for (let i = 0; i < allArea.length; i++) {
            let elX = allArea[i].x
            let elY = allArea[i].y

            if (elX !== randomX && randomY !== elY) {
                apple.x = randomX
                apple.y = randomY
            } else {
                do {
                    randomX = getRandomInt(0, widthArea) * grid;
                    randomY = getRandomInt(0, heightArea) * grid;
                } while (elX !== randomX && randomY !== elY);
            }
        }
    }
}

export class GameArea {
    constructor(maxScore) {
        this.maxScore = maxScore
    }

    areaOptions() {

    }

    getRandomInt() {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    setMaxScore() {
        if (this.maxScore === null) return maxScoreContainer.style.display = 'none'
        maxScoreContainer.style.display = 'flex'
        maxScore.innerHTML = this.maxScore
    }
}

class User {
    constructor(progress) {
        this.progress = progress;
    }

    getLocalMaxScore() {
        let maxUserScore = localStorage.getItem('userMaxScore');
        if (!maxUserScore) return null

        if (maxUserScore < this.progress) {
            maxScoreContainer.classList.toggle('max-score--active', true)

            return new GameArea(this.progress).setMaxScore()
        }
    }
}

var canvas = document.getElementById('game-window');
var context = canvas.getContext('2d');
var grid = 20;
var count = 0;

export const snake = {
    x: 0,
    y: 0,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 3,
    paused: false,
    color: "green",
    progress: 0,
    progressCount: 2,
    initialCell: 3,
};

const apple = {
    x: 100,
    y: 100,
    color: "red",
    length: 1
}

const win = (square / grid - snake.initialCell - 1 - apple.length) * snake.progressCount


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function loop() {

    let myReq = requestAnimationFrame(loop);

    if (++count < 6) {
        return;
    }

    if(win === snake.progress){
        alert('victory!')
    }

    if (snake.paused === true) {
        return
    }

    progressValue.innerHTML = `${snake.progress}`

    count = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x >= canvas.width) {
        snake.x = 0
    }

    if (snake.x < 0) {
        snake.x = canvas.width - grid
    }

    if (snake.y >= canvas.height) {
        snake.y = 0
    }

    if (snake.y < 0) {
        snake.y = canvas.height
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    context.fillStyle = apple.color
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    //obstacle future
    // context.fillStyle = obstacle.color
    // for (let i = 0; i < obstacle.cells.length; i++) {
    //     context.fillRect(obstacle.cells[i].x, obstacle.cells[i].y, grid - 1, grid - 1)
    // }
    context.fillStyle = snake.color

    snake.cells.forEach((cell, idx) => {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1)

        if (cell.x === apple.x && cell.y === apple.y) {

            snake.maxCells++;

            new Apple().setApple()

            snake.progress += snake.progressCount

            if (new User().getLocalMaxScore() === null) return

            if (snake.progress > new User(snake.progress).getLocalMaxScore()) {
                return new User(snake.progress).getLocalMaxScore()
            }
        }

        for (let i = idx + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                modalGame.classList.toggle('modal-game--active', true)
                currentMaxScore.textContent = progressValue.textContent

                progressValue.innerHTML = `${snake.progress}`

                if (localStorage.getItem('userMaxScore') < snake.progress) {
                    localStorage.setItem('userMaxScore', snake.progress)
                    resetScoreBtn.disabled = false
                }

                localStorage.setItem('userMaxScore', snake.progress)
                new User(snake.progress).getLocalMaxScore()

                snake.progress = 0

                window.cancelAnimationFrame(myReq)

                snake.x = getRandomInt(0, widthArea) * grid;
                snake.y = getRandomInt(0, heightArea) * grid;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;

                new Apple().setApple()

                maxScoreContainer.classList.toggle('max-score--active', false)
                wrapper.classList.toggle('wrapper-back', false)
            }
        }

        // for (let i = 0; i < obstacle.cells.length; i++) {
        //     if (cell.x === obstacle.cells[i].x && cell.y === obstacle.cells[i].y) {
        //         modalGame.classList.toggle('modal-game--active', true)
        //         window.cancelAnimationFrame(myReq)

        //         snake.progress = 0

        //         window.cancelAnimationFrame(myReq)

        //         snake.x = getRandomInt(0, widthArea) * grid;
        //         snake.y = getRandomInt(0, heightArea) * grid;
        //         snake.cells = [];
        //         snake.maxCells = 4;
        //         snake.dx = grid;
        //         snake.dy = 0;

        //         new Apple().setApple()

        //         obstacle.cells = []

        //         wrapper.classList.toggle('wrapper-back', false)
        //     }
        // }
    })

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
}