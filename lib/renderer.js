const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const { windowEvents } = remote.require(`${__dirname}/main`);

import TimerStore from './timer-store';
import KryptoniteStore from './kryptonite-store';
import RenderTimer from './render-timer';
import Forms from './forms';
let crystal = new Image();
crystal.scr = '../assets/crystal.png';

import React, {
  Component
} from 'react';

import ReactDOM from 'react-dom';

class Application extends Component {
  constructor() {
    super();
    this.state = { timerSeconds: "",
                   timerActive: false,
                   pomo: false,
                   flash: null
                 };
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
      this.state.flash = null;
      TimerStore.togglePomo(false);
      TimerStore.clearTimer();
      this.state.pomo = false;
      this.renderMain();
    });

    KryptoniteStore.on('mismatch', lyrics => {
      this.state.flash = "Your guess was wrong. Try harder next time.";
    });
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
      this.state.flash = null;
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

    let title = this.state.pomo ? <div><h1 className="pomo-title">Kryptonite</h1></div>
                                : <div><img src="../assets/crystal.png" className="crystal-logo title" />
                                  <h1 className="main-title">Kryptonite</h1></div>;

    return (
      <div>
        <div class='title-row'>
          {title}
        </div>
        <div>
          <RenderTimer className="app-objects" timerSeconds={this.state.timerSeconds} timerActive={this.state.timerActive} pomo={this.state.pomo} />
          <Forms timerSeconds={this.state.timerSeconds} timerActive={this.state.timerActive}  pomo={this.state.pomo} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.querySelector('.application'));
