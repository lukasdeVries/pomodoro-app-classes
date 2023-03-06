import Functions from './Functions.js'
import Alert from './Alert.js'

export default class Timer extends Functions{
    /**
     * sets number of minutes used in timer and sets duration of break
     * 
     */
    constructor() {
        super()

        let functions = new Functions()

        this.interval = null

        this.breakCount = 0 
        this.breakCounterValue = 0 

        this.breakInterval = null

        this.breakTime
        this.breaktimeStart

        this.remainingSeconds
        this.remainingSecondsStart

        this.titleMinutes = null 
        this.titleSeconds = null 

        this.buttonContent0
        this.buttonContent1
        this.buttonContent2
        this.buttonContent3

        this.breakDevider = null 

        this.titleTimer
        
    }

    /**
     * updates the elements based om the given time
     * timerType determines if the title timer gets updates 
     * give 'work' for the main timer leave open for the break timer
     * @param {HTMLElement} minutesElement 
     * @param {HTMLElement} secondsElement 
     * @param {Number} remainingSeconds 
     * @param {String} timerType
     */
    updateTimer(minutesElement, secondsElement, remainingSeconds, timerType = '') {
        if(timerType === 'work'){
            this.updateTitleTime()
        }
        const minutes = Math.floor(remainingSeconds / 60)
        const seconds = remainingSeconds % 60
        minutesElement.innerHTML = minutes.toString().padStart(2, '0')
        secondsElement.innerHTML = seconds.toString().padStart(2, '0')
    }

    /**
     * updates content of the start button depending on the timer status and the number of breakes
     */
    updateStartStop() {
        let functions = new Functions()
        if( this.interval === null && this.breakInterval === null ){
            this.buttonContent0.innerHTML = 'Start'
        }else if ( this.breakCount > 0 && this.interval === null){
            this.buttonContent0.innerHTML = ''
            this.breakMinutesEl = functions.createHTMLElement('p', 'break-minutes', this.buttonContent0)
            this.breakDevider = functions.createHTMLElement('p', 'break-devider', this.buttonContent0, ' : ')
            this.breakSecondsEl = functions.createHTMLElement('p', 'break-seconds', this.buttonContent0)    
            this.updateTimer(this.breakMinutesEl, this.breakSecondsEl, this.breakTime)
        }else {
            this.buttonContent0.innerHTML = 'Stop'
        }
    }

    /**
     * starts a break and starts counting down the break time
     * @returns 
     */
    startBreak() {
        if (this.breakTime === 0) return
        this.breakInterval = setInterval(() => {
            this.breakTime--
            this.updateTimer(this.breakMinutesEl, this.breakSecondsEl, this.breakTime)
            // this.updateStartStop()
            if(this.breaktime === 0){
                console.log('break')
                this.stop('break')
                if(this.breakCount >= 4){
                    this.updateStartStop()
                    this.breakCount = 0
                    this.updateBreakCount(this.breakCount)
                }
            }
            this.updateStartStop()
        }, 1000)

    }

    start() {
        let alert = new Alert()
        if (this.remainingSeconds === 0 && this.interval !== null) return
        this.updateStartStop()
        this.interval = setInterval(() => {
            this.remainingSeconds--
            this.updateTimer(this.timerMinutes, this.timerSeconds, this.remainingSeconds, 'work')

            if (this.remainingSeconds === 0) {
                this.breakCount++
                this.updateBreakCount(this.breakCount)
                if (this.breakCount < 4) {
                    this.remainingSeconds = this.remainingSecondsStart
                    this.breaktime = this.breaktimeStart
                    this.startBreak()
                    this.updateStartStop()
                    alert.showAlert(this.breakTime)
                }
                else{
                    this.remainingSeconds =this.remainingSecondsStart
                    this.breakTime = this.breaktimeStart * 2
                    this.startBreak()
                    this.updateStartStop()
                    alert.showAlert(this.breakTime)
                }
                this.updateTimer(this.breakMinutesEl, this.breakSecondsEl, this.breaktime)
                this.stop('interval')
            }
        }, 1000)
        this.updateStartStop()
    }

    stop(interval) {
        if(interval === null) return;
        if(interval === 'break'){
            clearInterval(this.breakInterval)
            this.breakInterval = null
            console.log('2')

        }else{
            clearInterval(this.interval)
            this.interval = null

        }
        this.updateStartStop()
    }

    restart(startingSeconds) {
        if(this.breakInterval !== null) return
        this.remainingSeconds = startingSeconds
        this.updateTimer(this.timerMinutes, this.timerSeconds, this.remainingSeconds, 'work')
        this.updateStartStop()
    }
    
    updateBreakCount(breakNumber){
        this.breakCounterValue.innerHTML = breakNumber
    }

    addMinutes(minutes) {
        if(this.breakInterval !== null) return
        const seconds = minutes * 60
        this.remainingSeconds = this.remainingSeconds + seconds
        this.updateTimer()
    }

    updateTitleTime() {
        this.titleTimer.item(0).innerHTML = ''
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        this.titleTimer.item(0).innerHTML = `pomodoro app - ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`    
    }


    /**
     * creates the html elements for the timer
     */
    createTimerHTML() {
        let functions = new Functions()

        const pomodoro = document.getElementById('pomodoro-app')

        const wrapper = functions.createHTMLElement('div', 'wrapper', pomodoro)

        const breakCounter = functions.createHTMLElement('div', 'break-counter', wrapper)

        const breakCounterText = functions.createHTMLElement('p', 'break-counter__text', breakCounter, 'Break counter: ')

        this.breakCounterValue = functions.createHTMLElement('p', 'break-counter__value', breakCounter, '0')

        const wrapperCenter = functions.createHTMLElement('div', 'wrapper__center', wrapper)

        const timerContainer = functions.createHTMLElement('div', 'timer', wrapperCenter)
        
        const timerDisplay = functions.createHTMLElement('div', 'timer__display', timerContainer)

        this.timerMinutes = functions.createHTMLElement('p', 'minutes', timerDisplay, '00')
        this.timerDevider = functions.createHTMLElement('p', 'devider', timerDisplay, ' : ')
        this.timerSeconds = functions.createHTMLElement('p', 'seconds', timerDisplay, '00')

        const buttonContainer = functions.createHTMLElement('div', 'button-container', wrapperCenter)

        const buttons = ['startStop', 'restart', '1min', '10min']

        buttons.forEach(function(el){
            var buttonDiv = document.createElement('button');
            buttonDiv.id = el;
            buttonDiv.className = 'button';
            buttonContainer.appendChild(buttonDiv);
        })
        
        this.buttonContent0 = document.getElementById('startStop');
        this.buttonContent0.innerHTML = 'Start';
        this.buttonContent1 = document.getElementById('restart');
        this.buttonContent1.innerHTML = 'Restart';
        this.buttonContent2 = document.getElementById('1min');
        this.buttonContent2.innerHTML = '+ 1min';
        this.buttonContent3 = document.getElementById('10min');
        this.buttonContent3.innerHTML = '+ 10min';
        
        this.titleTimer = document.getElementsByTagName('title');
        this.breakMinutesEl = functions.createHTMLElement('p', 'break-minutes', this.buttonContent0)
        this.breakSecondsEl = functions.createHTMLElement('p', 'break-seconds', this.buttonContent0)

    }
}