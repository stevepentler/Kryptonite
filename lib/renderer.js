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
    this.state = { timerSeconds: 30, timerActive: false, timerPomo: false}
  }

  componentDidMount() {
    store.on('tick', timer => {
      this.setState({ timerSeconds: timer.seconds,
                      timerActive: timer.active,
                      timerPomo: timer.pomo });

      this.assessPomo();
      console.log(this.state.timerSeconds);
    });

    store.on('change', timer => {
      this.setState({ timerSeconds: timer.seconds,
                      timerActive: timer.active,
                      timerPomo: timer.pomo });
      this.state.timerPomo ? this.triggerPomo() : this.renderMain()
    });
  }

  assessPomo() {
    if (this.state.timerSeconds === 0) {
      store.clearTimer();
      store.togglePomo();
    }
  }

  triggerPomo() {
    console.log('weinerboy')
    store.initiateTimer(5)
    windowEvents.renderPomo();
  }

  renderMain() {
    windowEvents.renderMain();
  }

  render() {
    return (
      <div>
        <h1>Kryptonite</h1>
        <Timer timerSeconds={this.state.timerSeconds} timerActive={this.state.timerActive}/>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.querySelector('.application'));
