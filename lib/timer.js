import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

let timerState = {workSeconds: 0,
                  pomoSeconds: 0,
                  active: false,
                  pomo: false};
let interval;

  const timer = new EventEmitter();

  timer.initiateTimer = function() {
    timerState.active = true;
    interval = setInterval( function() {
      timer.subtractTime();
      timer.emit('tick', timerState);
      }, 1000);
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
  }

  timer.setUserIntervals = function(workTimer, pomoTimer) {
    timerState.workSeconds = workTimer;
    timerState.pomoSeconds = pomoTimer;
    console.log(timerState.pomoSeconds)
  }

  timer.subtractTime = function() {
    if (timerState.pomo) {
      timerState.pomoSeconds -= 1
    } else {
      timerState.workSeconds -= 1
    }
  }

export default timer;