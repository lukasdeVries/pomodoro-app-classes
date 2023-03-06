import Timer from './Timer.js'
import Alert from './Alert.js'

const timer = new Timer()
const alert = new Alert()

let clicked

timer.createTimerHTML()


window.addEventListener( 'DOMContentLoaded', () => {
    const userInput = prompt('how many minutes do you want to work?');
    timer.remainingSecondsStart = userInput * 60;
    timer.remainingSeconds = timer.remainingSecondsStart;
    
    if(userInput === '' || timer.remainingSecondsStart > 3600 || timer.remainingSecondsStart < 3){
        alertHeader.innerHTML = 'Wrong value!'
        alertContent.innerHTML = 'Reload page and give other value'
        return;
    };
    
    
    const userBreakInput = prompt('How long should your breaktime be? (after 4 brakes the break time will be doubled!)');
    
    timer.breakTimeStart = userBreakInput * 60;
    timer.breakTime = timer.breakTimeStart;
    
    if(userBreakInput === '' || timer.breakTimeStart > 3600 || timer.breakTimeStart < 3){
        alertHeader.innerHTML = 'Wrong value!'
        alertContent.innerHTML = 'Reload page and give other value'
        return;
    };

    alert.timerAlert.style.opacity = 0

    timer.updateTimer(timer.timerMinutes, timer.timerSeconds, timer.remainingSeconds, 'work')
    timer.updateStartStop()



    timer.buttonContent0.addEventListener('click', () => {
        if(timer.interval === null && timer.breakInterval === null){
            timer.start()
            clicked = true
        }else {
            timer.stop('interval')
        }
    })

    timer.buttonContent1.addEventListener('click', () => {
        if (!clicked) return
        timer.restart(timer.remainingSecondsStart)
    })

    timer.buttonContent2.addEventListener('click', () => {
        timer.addMinutes(1)
    })

    timer.buttonContent3.addEventListener('click', () => {
        timer.addMinutes(10)
    })


})
