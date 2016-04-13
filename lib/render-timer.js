const React = require('react');
import timer from './timer';
import { ipcRenderer } from 'electron';

const RenderTimer = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    timer.setUserIntervals(this.refs.workTimer.value, this.refs.pomoTimer.value);
    timer.toggleActive();
    timer.initiateTimer();
  },

  handlePause(e) {
    e.preventDefault();
    timer.clearTimer();
    timer.toggleActive();
  },

  render() {

    let pauseButton = <p><button onClick={this.handlePause}>Pause</button></p>

    let activeDisplay = <div className="active-display">
                          <h3>{this.props.timerSeconds} seconds remaining</h3>
                          { !this.props.pomo ? pauseButton : ""}
                        </div>;

    let inactiveDisplay =
          <div className="time-interval-form">
            <h3>Work Interval</h3>
            <form>
              <input
               defaultValue= {this.props.timerSeconds}
               ref='workTimer'
               type='number'
               className="work-interval-form"
              />
            <p>seconds</p>
            <h3>Break Interval</h3>
              <input
               defaultValue= ''
               ref='pomoTimer'
               type='number'
               className="pomo-interval-form"
              />
              <p>seconds</p>
             <p><button onClick={this.handleSubmit}>Start Timer</button></p>
            </form>
          </div>;

    return(
      this.props.timerActive ? activeDisplay : inactiveDisplay
    );
  },
});



module.exports = RenderTimer;
