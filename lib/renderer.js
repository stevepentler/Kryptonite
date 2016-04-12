const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
import store from './store';
const { windowEvents } = remote.require(`${__dirname}/main`);

import Timer from './timer';

import React, {
  Component,
} from 'react';
import ReactDOM from 'react-dom';

class Application extends Component {
  constructor() {
    super();
    this.state = { timer: 30 };
  }

  componentDidMount() {
      store.on('tick', timer => {
        this.setState({ timer });
      });
  }

  render() {
    return (
      <div>
        <h1>Kryptonite</h1>
        <Timer timer={this.state.timer} />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.querySelector('.application'));
