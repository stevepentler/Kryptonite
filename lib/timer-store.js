import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

let timerState = {workSeconds: 30,
                  pomoSeconds: 30,
                  active: false,
                  pomo: false};
let interval;

  const TimerStore = new EventEmitter();

  TimerStore.initiateTimer = function() {
    if (timerState.active) {
    interval = setInterval( function() {
      TimerStore.subtractTime();
      TimerStore.emit('tick', timerState);
      }, 1000);
    }
  };

  TimerStore.togglePomo = function(shouldEmit) {
    timerState.pomo = !timerState.pomo;
    if (shouldEmit){
      TimerStore.emit('togglePomo', timerState);
    }
  };

  TimerStore.clearTimer = function() {
    clearInterval(interval);
  };

  TimerStore.toggleActive = function() {
    timerState.active = !timerState.active;
    TimerStore.emit('reset', timerState);
  };

  TimerStore.initialValues = function(){
    timerState = { workSeconds: 30,
                   pomoSeconds: 30,
                   active: false,
                   pomo: false };

    TimerStore.emit('tick', timerState);
  };

  TimerStore.setUserIntervals = function(workTimer, pomoTimer) {
    timerState.workSeconds = workTimer * 60;
    timerState.pomoSeconds = pomoTimer * 60;
  };

  TimerStore.subtractTime = function() {
    if (timerState.pomo) {
      timerState.pomoSeconds -= 1;
    } else {
      timerState.workSeconds -= 1;
    }
  };

export default TimerStore;
