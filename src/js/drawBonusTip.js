import { boosts, snake } from "./interfaces";
const progressTitle = document.querySelector('.progress-title')
export function drawBonusTips () {
    console.log('привет');
    boosts.setStatus = false;
    snake.progressCount = 6;
    progressTitle.style.color = 'yellow';
    const bonus = document.createElement('span')
    bonus.innerHTML = '2X time'
    progressTitle.appendChild(bonus)
    setTimeout(() => {
      progressTitle.style.color = 'white';
      snake.progressCount = 3;
      progressTitle.removeChild(bonus)
    }, 10000);
    let c = 10
    let countText = document.createElement('p')
    bonus.appendChild(countText)
    return setTimeout(() => {
      if(c > 0){
        c -= 1;
        countText = c
      }
    }, 1000);
} 