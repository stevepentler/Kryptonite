const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const { windowEvents } = remote.require(`${__dirname}/main`);

import TimerStore from './timer-store';
import KryptoniteStore from './kryptonite-store';
import RenderTimer from './render-timer';
import Forms from './forms';

import React, {
  Component,
} from 'react';

import ReactDOM from 'react-dom';

class Application extends Component {
  constructor() {
    super();
    this.state = { timerSeconds: "",
                   timerActive: false,
                   pomo: false}
  }

  componentDidMount() {
    TimerStore.on('tick', timerState => {
      this.setState({timerSeconds: this.determineTimeSource(timerState),
                     timerActive: timerState.active});
      this.assessPomo ();
    });

    TimerStore.on('togglePomo', timerState => {
      this.setState({pomo: timerState.pomo });
      this.state.pomo ? this.renderPomo() : this.renderMain();
    });

    TimerStore.on('reset', timerState => {
      this.setState({timerActive: timerState.active});
    });

    KryptoniteStore.on('match', lyrics => {
      TimerStore.togglePomo(false);
      TimerStore.clearTimer();
      this.state.pomo = false
      this.renderMain();
    })
  }

  determineTimeSource(timerState){
    return timerState.pomo ? timerState.pomoSeconds : timerState.workSeconds;
  }

  updateState(timerState) {
    this.setState({ timerSeconds: timerState.seconds,
                    timerActive: timerState.active,
                    pomo: timerState.pomo });
  }

  assessPomo() {
    if (this.state.timerSeconds === 0) {
      TimerStore.clearTimer();
      TimerStore.togglePomo(true);
    }
  }

  renderPomo() {
    TimerStore.initiateTimer();
    windowEvents.renderPomo();
  }

  renderMain() {
    KryptoniteStore.rotateQuestion();
    TimerStore.toggleActive();
    windowEvents.renderMain();
  }

  render() {
    return (
      <div>
        <h1 className="title">Kryptonite</h1>
        <RenderTimer timerSeconds={this.state.timerSeconds} timerActive={this.state.timerActive} pomo={this.state.pomo} />
        <Forms timerSeconds={this.state.timerSeconds} timerActive={this.state.timerActive}  pomo={this.state.pomo} />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.querySelector('.application'));
