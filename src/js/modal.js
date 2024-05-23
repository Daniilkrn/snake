import { User, maxScoreContainer } from "./app.js"
import { GameArea } from "./app.js"
import { gameAreaSettings } from "./interfaces.js";
import { tips } from "./tips.js";
export const resetScoreBtn = document.querySelector('#reset-score');
const settingsBtn = document.querySelector('.options-btn')
const modal = document.querySelector('.modal')
const closeBtn = document.querySelectorAll('.close')
const openBest = document.querySelector('.open')
const done = document.querySelector('.modal-settings__done');
const speedSelect = document.querySelectorAll('.modal-settings__choice');
const optionSelect = document.querySelectorAll('.modal-settings__choice-option');
const tipArea = document.querySelector('.tipArea');

settingsBtn.addEventListener('click', () => {
    modal.classList.toggle('modal--active', true)
})

speedSelect.forEach((speed,idx) => {
    speed.addEventListener('click', () => {
        return new GameArea().setGameAreaSpeed(speed.value)
    })
})

document.addEventListener('DOMContentLoaded', () => {
    let speedValue = localStorage.getItem('gameSpeed');
    let maxScore = localStorage.getItem('userMaxScore');
    if(!maxScore){
        resetScoreBtn.setAttribute('disabled', 'on');
        return new GameArea().setMaxScore(0)
    } 

    gameAreaSettings.speed = +speedValue;
    optionSelect.forEach(speed => {
        if(speed.value == speedValue){
            speed.selected = true;
        }
    })
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

resetScoreBtn.addEventListener('mouseover', () => {
    if(!resetScoreBtn.hasAttribute('disabled')){
        tipArea.classList.toggle('active')
        tipArea.innerText = tips.emptyReset
    }
})

resetScoreBtn.addEventListener('mouseleave', () => {
    tipArea.classList.toggle('active', false)
    tipArea.innerText = ''
})