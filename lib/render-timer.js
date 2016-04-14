const React = require('react');
import TimerStore from './timer-store';
import { ipcRenderer } from 'electron';

const RenderTimer = React.createClass({

  handlePause(e) {
    e.preventDefault();
    timer.clearTimer();
    timer.toggleActive();
  },

  str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
  },

  render() {

    let minutes = Math.floor(this.props.timerSeconds / 60);

    let seconds = this.props.timerSeconds - minutes * 60;

    let pauseButton = <p><button onClick={this.handlePause}>Pause</button></p>;

    let timerDisplay = <div className="active-display">
                        <h3>{ this.str_pad_left(minutes,'0',2) + ':' + this.str_pad_left(seconds,'0',2) } time units</h3>
                        { !this.props.pomo ? pauseButton : "" }
                       </div>;

    return(

      this.props.timerActive ? timerDisplay : <div></div>

    );
  },
});



module.exports = RenderTimer;
