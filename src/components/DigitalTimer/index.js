// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, seconds: 0, timeStatus: 'Paused', timer: 25}

  changeTimeStatus = () => {
    const {timeStatus, minutes, seconds} = this.state

    const newTimeStatus =
      timeStatus === 'Paused' && (minutes || seconds) ? 'Running' : 'Paused'

    this.setState({timeStatus: newTimeStatus})

    if (newTimeStatus === 'Running') {
      this.changeSecondsAndMinutes()
    } else {
      clearInterval(this.timerId)
    }
  }

  increaseMinutes = () => {
    if (!this.condition) {
      this.setState(prevState => ({
        timer: prevState.timer + 1,
        minutes: prevState.timer + 1,
      }))
    }
  }

  decreaseMinutes = () => {
    if (!this.condition) {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
        minutes: prevState.timer - 1,
      }))
    }
  }

  changeSecondsAndMinutes = () => {
    const {minutes} = this.state
    if (minutes) {
      this.condition = true
    }
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {seconds, timeStatus, minutes} = this.state
    if (this.condition) {
      if (seconds && timeStatus === 'Running') {
        if (seconds === 1 && minutes === 0) {
          this.condition = false
          this.setState(prevState => ({seconds: prevState.seconds - 1}))
        } else {
          this.setState(prevState => ({seconds: prevState.seconds - 1}))
        }
      } else {
        this.setState({seconds: 59})
        this.setState(prevState => ({minutes: prevState.minutes - 1}))
      }
    } else {
      this.setState({timeStatus: 'Paused'})
      clearInterval(this.timerId)
    }
  }

  resetTime = () => {
    clearInterval(this.timerId)
    this.setState({minutes: 25, seconds: 0, timeStatus: 'Paused', timer: 25})
    this.condition = false
  }

  render() {
    const {minutes, seconds, timeStatus, timer} = this.state
    let timeSeconds = seconds
    let timeMinutes = minutes
    const btnText = timeStatus === 'Paused' ? 'Start' : 'Pause'
    const srcLink =
      timeStatus === 'Paused'
        ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const altTxt = timeStatus === 'Paused' ? 'play icon' : 'pause icon'

    if (seconds < 10) {
      timeSeconds = seconds.toString()
      timeSeconds = 0 + timeSeconds
    }
    if (minutes < 10) {
      timeMinutes = minutes.toString()
      timeMinutes = 0 + timeMinutes
    }

    return (
      <div className="main-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="img-timer-container">
          <div className="img-container">
            <div className="timer-time-box">
              <h1>
                {timeMinutes}:{timeSeconds}
              </h1>
              <p>{timeStatus}</p>
            </div>
          </div>
          <div className="timer-settings">
            <div className="start-reset-btn">
              <button
                type="button"
                onClick={this.changeTimeStatus}
                className="start-pause play-text"
              >
                <img src={srcLink} alt={altTxt} className="play-btn" />
                {btnText}
              </button>

              <button
                type="button"
                onClick={this.resetTime}
                className="reset-time reset-text"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="reset-btn"
                />{' '}
                Reset
              </button>
            </div>

            <p className="set-timer-text">Set Timer limit</p>
            <div className="inc-dec-btns">
              <button
                type="button"
                onClick={this.decreaseMinutes}
                className="increase-minute"
              >
                <p>-</p>
              </button>
              <p className="timer-box">{timer}</p>
              <button
                type="button"
                onClick={this.increaseMinutes}
                className="decrease-minute"
              >
                <p>+</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
