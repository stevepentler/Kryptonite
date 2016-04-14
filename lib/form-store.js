import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

let formState = {gettysburgAddress: ''};

  const FormStore = new EventEmitter();

export default FormStore;
