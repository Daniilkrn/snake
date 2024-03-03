import { snake } from "./app.js"
import { grid } from "./consts.js"

const mobileKeys = document.querySelectorAll('.arrow')

function keyDownsMobile(key) {
    console.log(key.target);
    if (key.target.id === 'up') {
        if (snake.dx > 0) {
            snake.dy = -grid
            snake.dx = 0
        }

        if (snake.dx < 0) {
            snake.dy = -grid
            snake.dx = 0
        }
    }
    else if (key.target.id === 'down') {
        console.log('da');
        if (snake.dx > 0) {
            snake.dy = grid
            snake.dx = 0
        }

        if (snake.dx < 0) {
            snake.dy = grid
            snake.dx = 0
        }
    }
    else if (key.target.id === 'left') {
        if (snake.dy < 0) {
            snake.dx = -grid
            snake.dy = 0
        }

        if (snake.dy > 0) {
            snake.dx = -grid
            snake.dy = 0
        }
    }
    else if (key.target.id === 'right') {
        if (snake.dy < 0) {
            snake.dx = grid
            snake.dy = 0
        }

        if (snake.dy > 0) {
            snake.dx = grid
            snake.dy = 0
        }
    }
}

function keyDowns(e) {
    if (e.keyCode == '38') {
        if (snake.dx > 0) {
            snake.dy = -grid
            snake.dx = 0
        }

        if (snake.dx < 0) {
            snake.dy = -grid
            snake.dx = 0
        }
    }
    else if (e.keyCode == '40') {
        if (snake.dx > 0) {
            snake.dy = grid
            snake.dx = 0
        }

        if (snake.dx < 0) {
            snake.dy = grid
            snake.dx = 0
        }
    }
    else if (e.keyCode == '37') {
        if (snake.dy < 0) {
            snake.dx = -grid
            snake.dy = 0
        }

        if (snake.dy > 0) {
            snake.dx = -grid
            snake.dy = 0
        }
    }
    else if (e.keyCode == '39') {
        if (snake.dy < 0) {
            snake.dx = grid
            snake.dy = 0
        }

        if (snake.dy > 0) {
            snake.dx = grid
            snake.dy = 0
        }
    }
}

mobileKeys.forEach(key => {
    key.addEventListener('click', (key) => keyDownsMobile(key))
})

document.addEventListener('keydown', keyDowns)