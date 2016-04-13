import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

let timerState = {seconds: 0,
             active: false,
             pomo: false};
let interval;

  const timer = new EventEmitter();

  timer.initiateTimer = function(timeRemaining) {
    timerState.seconds = timeRemaining;
    timerState.active = true;
    interval = setInterval( function() {
      timerState.seconds -= 1;
      timer.emit('tick', timerState);
      }, 1000);
  };

  timer.togglePomo = function() {
    timerState.pomo = !timerState.pomo;
    timer.emitChange();
  };

  timer.clearTimer = function() {
    clearInterval(interval);
  };

  timer.emitChange = function(){
    timer.emit('change', timerState);
  };

export default timer;