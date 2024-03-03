import { GameArea } from "./app.js"

document.addEventListener('DOMContentLoaded', () => {
    const maxScoreUser = localStorage.getItem('userMaxScore')

    if (!maxScoreUser) {
        new GameArea(null).setMaxScore()
    }

    new GameArea(maxScoreUser).setMaxScore()
})