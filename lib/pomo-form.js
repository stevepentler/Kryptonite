const React = require('react');
import { ipcRenderer } from 'electron';
import KryptoniteStore from './kryptonite-store';
const PomoForm = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    KryptoniteStore.compareLyrics(this.refs.inputForm.value, KryptoniteStore.passageKey);
  },

  render() {

    return(
      <div className="statement-form">
        <h3>Enter {KryptoniteStore.passageKey} to exit</h3>
        <form>
          <textArea
           defaultValue= {KryptoniteStore.leadPassage()}
           ref='inputForm'
           type='text'
           rows = "10"
           className="input-form form-control form-style"
          />
          <br></br>
         <p><button onClick={this.handleSubmit} className="pomo-custom-button">Submit</button></p>
        </form>
      </div>
    );
  },
});

module.exports = PomoForm;
