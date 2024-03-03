import { loop, snake, progressValue, wrapper } from "./app.js"
export const modalGame = document.querySelector('.modal-game')
const modalStartGame = document.querySelector('.modal-start--active')
const restartModalBtn = document.querySelector('.restart-btn')
const startGameBtn = document.querySelector('.start-btn')

startGameBtn.addEventListener('click', () => {
    modalStartGame.classList.toggle('modal-start--active', false)
    requestAnimationFrame(loop)
    snake.paused = false

    wrapper.classList.toggle('wrapper-back', true)
})

restartModalBtn.addEventListener('click', () => {
    wrapper.classList.toggle('wrapper-back', true)

    modalGame.classList.toggle('modal-game--active', false)
    snake.paused = false

    if (localStorage.getItem('userMaxScore') < snake.progress) {
        localStorage.setItem('userMaxScore', snake.progress)
    }

    progressValue.innerHTML = ''

    loop()
})