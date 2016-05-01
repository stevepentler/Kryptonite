const React = require('react');
import TimerStore from './timer-store';
import { ipcRenderer } from 'electron';

const MainForm = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    TimerStore.setUserIntervals(this.refs.workTimer.value, this.refs.pomoTimer.value);
    TimerStore.toggleActive();
    TimerStore.initiateTimer();
  },

  render() {

    return(
      <div className="time-interval-form">
        <h3>Work Interval:</h3>
        <form>
          <input
           defaultValue= '+'
           ref='workTimer'
           type='number'
           min="0"
           max="60"
           className="work-interval-form form-control form-style"
           required
          />
        <p>minutes</p>
        <h3>Break Interval:</h3>
          <input
           defaultValue= ''
           ref='pomoTimer'
           type='number'
           min="0"
           max="60"
           className="pomo-interval-form form-control form-style"
           required
          />
          <p>minutes</p>
          <br></br>
         <p><button onClick={this.handleSubmit} className="custom-button">Start Timer</button></p>
        </form>
      </div>
    );
  },
});


module.exports = MainForm;
