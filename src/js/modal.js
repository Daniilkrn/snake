import { maxScoreContainer } from "./app.js"
import { GameArea } from "./app.js"
export const resetScoreBtn = document.querySelector('#reset-score');
const settingsBtn = document.querySelector('.options-btn')
const modal = document.querySelector('.modal')
const closeBtn = document.querySelectorAll('.close')
const openBest = document.querySelector('.open')
const done = document.querySelector('.modal-settings__done');

settingsBtn.addEventListener('click', () => {
    modal.classList.toggle('modal--active', true)
})

closeBtn.forEach(el => {
    el.addEventListener('click', () => {
        if (el.id === 'modal-settings') {
            return modal.classList.toggle('modal--active', false)
        }

        if (el.id === 'score-table') {
            maxScoreContainer.style.display = 'none'
            return openBest.style.display = 'block'
        }
    })

    done.classList.toggle('modal-settings__done--active', false)
})

openBest.addEventListener('click', () => {
    maxScoreContainer.style.display = 'flex'
    return openBest.style.display = 'none'
})

resetScoreBtn.addEventListener('click', () => {
    localStorage.removeItem('userMaxScore')
    new GameArea(null).setMaxScore()

    done.classList.toggle('modal-settings__done--active', true)

    done.addEventListener('animationend', () => {
        done.classList.toggle('modal-settings__done--active', false)
    })

    resetScoreBtn.disabled = true

    openBest.style.display = 'none'
})