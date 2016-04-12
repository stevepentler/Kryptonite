const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const { windowEvents } = remote.require(`${__dirname}/main`);

import Timer from './timer';

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
        <Timer setTimer={this.setTimer} />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.querySelector('.application'));
