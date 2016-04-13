const React = require('react');
import timer from './timer';
import { ipcRenderer } from 'electron';

const RenderTimer = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    timer.initiateTimer(this.refs.timer.value);
  },

  render() {
    let activeDisplay = <h3>{this.props.timerSeconds} seconds remaining</h3>
    let inactiveDisplay =
          <div className="time-interval-form">
            <h3>Set Time Interval</h3>
            <form>
              <input
               defaultValue= '30'
               ref='timer'
               type='text'
               className="time-interval-form"
              />
             <p><button onClick={this.handleSubmit}>Start Timer</button></p>
            </form>
          </div>

    return(
      this.props.timerActive ? activeDisplay : inactiveDisplay
    )
  },
});

module.exports = RenderTimer;

