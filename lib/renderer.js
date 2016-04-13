const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const { windowEvents } = remote.require(`${__dirname}/main`);

import timer from './timer';
import RenderTimer from './render-timer';

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
    timer.on('tick', timerState => {
      this.setState({ timerSeconds: timerState.seconds,
                      timerActive: timerState.active,
                      timerPomo: timerState.pomo });

      this.assessPomo();
      console.log(this.state.timerSeconds);
    });

    timer.on('change', timerState => {
      this.setState({ timerSeconds: timerState.seconds,
                      timerActive: timerState.active,
                      timerPomo: timerState.pomo });
      this.state.timerPomo ? this.triggerPomo() : this.renderMain()
    });
  }

  assessPomo() {
    if (this.state.timerSeconds === 0) {
      timer.clearTimer();
      timer.togglePomo();
    }
  }

  triggerPomo() {
    timer.initiateTimer(5)
    windowEvents.renderPomo();
  }

  renderMain() {
    windowEvents.renderMain();
  }

  render() {
    return (
      <div>
        <h1>Kryptonite</h1>
        <RenderTimer timerSeconds={this.state.timerSeconds} timerActive={this.state.timerActive}/>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.querySelector('.application'));
