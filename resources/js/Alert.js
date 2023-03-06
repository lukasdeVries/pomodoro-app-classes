import Functions from './Functions.js'
import Timer from './Functions.js'

export default class Alert extends Functions{

    /**
     * adjusts the alert visibility
     * @param {Number} breakTime 
     * @param {*} timerAlert 
     */
    showAlert(breakTime, alertElement, alertContentElement) {
        let timer = new Timer()
        alertElement.classList.remove('pomodoro-app__alert--invisible')
        alertElement.classList.add('pomodoro-app__alert--visible')
        let minutes = breakTime / 60
        if(minutes > 1){
            minutes = +minutes.toFixed(2)
        }
        let alertTimer = 7
        alertContentElement.innerHTML = `take a break and start again after: ${minutes} mins`
        setInterval(() => {
            alertTimer--
            if (alertTimer === 0){
                alertElement.classList.remove('pomodoro-app__alert--visible')
                alertElement.classList.add('pomodoro-app__alert--invisible')
            }
        }, 1000)

    }
}