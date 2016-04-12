const React = require('react');
import store from './store';
import { ipcRenderer } from 'electron';

const Timer = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    store.initiateTimer(this.refs.timer.value);
  },

  render() {
    return(
      <div className="time-interval-form">
        {this.props.timerSeconds} seconds remaining
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
    )
  },
});

module.exports = Timer;

