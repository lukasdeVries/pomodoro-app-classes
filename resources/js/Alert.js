import Functions from './Functions.js'

export default class Alert extends Functions{
    constructor(){
        super()
        const functions = new Functions()
        const pomodoroBodys = document.getElementsByTagName('body')
        this.pomodoroBody = pomodoroBodys.item(0)
        this.timerAlert = functions.createHTMLElement('div', 'pomodoro-app__alert', this.pomodoroBody)
        this.alertHeader = functions.createHTMLElement('p', 'alert__header', this.timerAlert, 'Time is Up!')
        this.alertContent = functions.createHTMLElement('p', 'alert__content', this.timerAlert)
    }


    /**
     * adjusts the alert visibility
     * @param {Number} breakTime 
     * @param {*} timerAlert 
     */
    showAlert(breakTime) {
        let minutes = breakTime / 60
        if(minutes > 1){
            minutes = +minutes.toFixed(2)
        }
        let alertTimer = 7
        this.alertContent.innerHTML = `take a break and start again after: ${minutes} mins`
        setInterval(() => {
            alertTimer--
            if (alertTimer === 0){
            }
        }, 1000)

    }
}