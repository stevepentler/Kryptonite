import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

  let timer = 0;

  const store = new EventEmitter();

  store.initiateTimer = function(timeRemaining) {
    timer = timeRemaining;
    let interval = setInterval( function() {
      timer -= 1;
      console.log(timer);
      store.emit('tick', timer);
      }, 1000);
  };

export default store;