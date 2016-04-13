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
    this.state = { timerSeconds: 30, timerActive: false, pomo: false}
  }

  componentDidMount() {
    timer.on('tick', timerState => {
      this.setState({timerSeconds: timerState.seconds, timerActive: timerState.active})
      this.assessPomo();
    });

    timer.on('togglePomo', timerState => {
      this.setState({pomo: timerState.pomo });
      this.state.pomo ? this.renderPomo() : this.renderMain()
    });

    timer.on('reset', timerState => {
      this.setState({timerActive: timerState.active});
    });
  }

  updateState(timerState) {
    this.setState({ timerSeconds: timerState.seconds,
                    timerActive: timerState.active,
                    pomo: timerState.pomo });
  }

  assessPomo() {
    if (this.state.timerSeconds === 0) {
      timer.clearTimer();
      timer.togglePomo();
    }
  }

  renderPomo() {
    timer.initiateTimer(5)
    windowEvents.renderPomo();
  }

  renderMain() {
    timer.toggleActive();
    windowEvents.renderMain();
  }

  render() {
    return (
      <div>
        <h1>Kryptonite</h1>
        <RenderTimer timerSeconds={this.state.timerSeconds} timerActive={this.state.timerActive} />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.querySelector('.application'));
