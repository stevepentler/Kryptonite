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

  str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
  },

  render() {

    let minutes = Math.floor(this.props.timerSeconds / 60);

    let seconds = this.props.timerSeconds - minutes * 60;

    let pauseButton = <p><button onClick={this.handlePause}>Pause</button></p>;

    let activeDisplay = <div className="active-display">
                          <h3>{ this.str_pad_left(minutes,'0',2) + ':' + this.str_pad_left(seconds,'0',2) } time units</h3>
                          { !this.props.pomo ? pauseButton : "" }
                        </div>;

    let inactiveDisplay =
          <div className="time-interval-form">
            <h3>Work Interval</h3>
            <form>
              <input
               defaultValue= ''
               ref='workTimer'
               type='number'
               className="work-interval-form"
              />
            <p>minutes</p>
            <h3>Break Interval</h3>
              <input
               defaultValue= ''
               ref='pomoTimer'
               type='number'
               className="pomo-interval-form"
              />
              <p>minutes</p>
             <p><button onClick={this.handleSubmit}>Start Timer</button></p>
            </form>
          </div>;

    return(
      this.props.timerActive ? activeDisplay : inactiveDisplay
    );
  },
});



module.exports = RenderTimer;
