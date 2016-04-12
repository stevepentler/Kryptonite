const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const { windowEvents } = remote.require(`${__dirname}/main`);

import React, {
  Component,
} from 'react';
import ReactDOM from 'react-dom';

class Application extends Component {
  constructor() {
    super();
    this.state = { content: 'wowow' };
  }

  render() {
    return (
      <div>
        <h1>Kryptonite</h1>
        <TimeInterval setTimeInterval={this.setTimeInterval} />
      </div>
    );
  }
}

const TimeInterval = React.createClass({

  getInitialState() {
      return { timer: 30 };
  },

  setTimeInterval(event) {
    event.preventDefault();
    this.props.setTimeInterval(this.state);
  },

  handleEdit() {
    this.state.timer = this.refs.timer.value;
    this.initiateTimer();
  },

  initiateTimer() {
    console.log(this.state.timer);
    let remainingTime = this.state.timer;
    console.log(remainingTime);
  },

  render() {
    return(
      <div className="time-interval-form">
        <h3>Set Time Interval</h3>
        <form onSubmit={this.setTimer}>
          <input
           defaultValue= '30'
           ref='timer'
           type='text'
           className="time-interval-form"
          />
         <p><button onClick={this.handleEdit}>Start Timer</button></p>
        </form>
      </div>
    )
  },
});

ReactDOM.render(<Application />, document.querySelector('.application'));
