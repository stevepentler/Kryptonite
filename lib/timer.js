import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

let timerState = {workSeconds: 30,
                  pomoSeconds: 30,
                  active: false,
                  pomo: false};
let interval;

  const timer = new EventEmitter();

  timer.initiateTimer = function() {
    if (timerState.active) {
    interval = setInterval( function() {
      timer.subtractTime();
      timer.emit('tick', timerState);
      }, 1000);
    }
  };

  timer.togglePomo = function() {
    timerState.pomo = !timerState.pomo;
    timer.emit('togglePomo', timerState);
  };

  timer.clearTimer = function() {
    clearInterval(interval);
  };

  timer.toggleActive = function() {
    timerState.active = !timerState.active;
    timer.emit('reset', timerState);
  };

  timer.initialValues = function(){
    timerState = { workSeconds: 30,
                   pomoSeconds: 30,
                   active: false,
                   pomo: false };

    timer.emit('tick', timerState);
  };

  timer.setUserIntervals = function(workTimer, pomoTimer) {
    timerState.workSeconds = workTimer * 60;
    timerState.pomoSeconds = pomoTimer * 60;
  };

  timer.subtractTime = function() {
    if (timerState.pomo) {
      timerState.pomoSeconds -= 1;
    } else {
      timerState.workSeconds -= 1;
    }
  };

export default timer;
