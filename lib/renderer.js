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

  changeContent() {
    windowEvents.renderPomo();
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <TimeInterval setTimeInterval={this.setTimeInterval} />
        <p><button onClick={this.changeContent.bind(this)}>Change Content</button></p>
      </div>
    );
  }
}

const TimeInterval = React.createClass({
  getInitialState() {
      return {
          timer: '',
      };
  },

  setTimeInterval(event) {
    event.preventDefault();
    this.props.setTimeInterval(this.state);
  },

  onFieldChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  },

  render() {
    return(
      <div className="setTimeInterval">
        <h3>Set Time Interval</h3>
        <form onSubmit={this.setTimeInterval}>
          <input
           value={this.state.timer}
           name="set-timer"
           className="time-interval-form"
           placeHolder="30 mins"
           onChange={this.onFieldChange}
         />
         <input
           className="submit-interval-form"
           type="submit"
           value="Start Timer!"
         />
        </form>
      </div>
    )
  },
});

ReactDOM.render(<Application />, document.querySelector('.application'));
