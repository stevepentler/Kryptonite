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

  handleStop(e) {
    e.preventDefault();
    timer.clearTimer();
    timer.toggleActive();
  },

  render() {

    let activeDisplay = <div>
                          <h3>{this.props.timerSeconds} seconds remaining</h3>
                          <p><button onClick={this.handleStop}> stop </button></p>
                        </div>;

    let inactiveDisplay =
          <div className="time-interval-form">
            <h3>Set Work Interval</h3>
            <form>
              <input
               defaultValue= {this.props.timerSeconds}
               ref='workTimer'
               type='text'
               className="work-interval-form"
              />
            <h3>Set Pomodoro Interval</h3>
              <input
               defaultValue= ''
               ref='pomoTimer'
               type='text'
               className="pomo-interval-form"
              />
             <p><button onClick={this.handleSubmit}>Start Timer</button></p>
            </form>
          </div>;

    return(
      this.props.timerActive ? activeDisplay : inactiveDisplay
    );
  },
});



module.exports = RenderTimer;
