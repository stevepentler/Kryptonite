import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

let formState = "one";



const KryptoniteStore = new EventEmitter();

KryptoniteStore.compareLyrics = function(lyrics){
  let newLyrics = lyrics.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']/g,"");
  newLyrics = newLyrics.toLowerCase();
  if (newLyrics === formState){
    KryptoniteStore.emit('match', lyrics);
  }
};

export default KryptoniteStore;
