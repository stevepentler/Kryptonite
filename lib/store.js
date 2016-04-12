import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

  let timer = {seconds: 0,
               active: false,
               pomo: false};
  let interval;

  const store = new EventEmitter();

  store.initiateTimer = function(timeRemaining) {
    timer.seconds = timeRemaining;
    timer.active = true;
    interval = setInterval( function() {
      timer.seconds -= 1;
      store.emit('tick', timer);
      }, 1000);
  };

  store.togglePomo = function() {
    timer.pomo = !timer.pomo;
    store.emitChange();
  };

  store.clearTimer = function() {
    clearInterval(interval);
  };

  store.emitChange = function(){
    store.emit('change', timer);
  };

export default store;