import EventEmitter from 'events';
import { ipcRenderer } from 'electron';
import passages from './passages';

const KryptoniteStore = new EventEmitter();

let counter = 0;

KryptoniteStore.incrementCounter = function() {
  if (counter > 3) {
    counter = 0;
  } else {
    counter += 1;
  }
};

KryptoniteStore.formatStrings = function(string) {
  let removeSymbols = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']/g,"");
  let lowerCase = removeSymbols.toLowerCase();
  return lowerCase;
};

let passageKeys = Object.keys(passages);
KryptoniteStore.passageKey = passageKeys[counter];
KryptoniteStore.passageValue = passages[KryptoniteStore.passageKey];


KryptoniteStore.compareLyrics = function(entry, key){
  let userEntry = KryptoniteStore.formatStrings(entry);
  let passageValue = KryptoniteStore.formatStrings(passages[key]);
  console.log(userEntry, passageValue);
  if (userEntry === passageValue){
    KryptoniteStore.emit('match', entry);
  } else {
    KryptoniteStore.emit('mis-match', entry);
  }
};

KryptoniteStore.rotateQuestion = function(){
  KryptoniteStore.incrementCounter();
  KryptoniteStore.passageKey = passageKeys[counter];
  KryptoniteStore.passageValue = passages[KryptoniteStore.passageKey];
};

KryptoniteStore.leadPassage = function() {
  let lead = KryptoniteStore.passageValue.split(' ').slice(0, 7).join(' ');
  return lead + " ...";
};


export default KryptoniteStore;
