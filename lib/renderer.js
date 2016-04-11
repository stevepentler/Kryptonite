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
        <p>{this.state.content}</p>
        <p><button onClick={this.changeContent.bind(this)}>Change Content</button></p>
      </div>
    );
  }
}

const setTimeInterval = React.createClass({
  onFieldChange(event) {
    this.setState([event.target.name]: event.target.value);
  },

  render() {
    return(
      <div className="setTimeInterval">
        <form>
          <input
           value={this.state.name}
           name="set-timer"
           className="time-interval-form"
           placeHolder="30 mins"
           onChange={this.onFieldChange}
         />
         <input
           className="submit-interval-form"
           type="submit-timer"
           value="Start Timer!"
         />
        </form>
      </div>
    )
  }


})
ReactDOM.render(<Application />, document.querySelector('.application'));
