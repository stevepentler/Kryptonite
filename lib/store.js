import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

  let timer = {seconds: 0,
               active: false};

  const store = new EventEmitter();

  store.initiateTimer = function(timeRemaining) {
    timer.seconds = timeRemaining;
    timer.active = true;
    let interval = setInterval( function() {
      timer.seconds -= 1;
      store.emit('tick', timer);
      }, 1000);
  };

export default store;