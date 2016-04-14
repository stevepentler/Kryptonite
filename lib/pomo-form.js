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
        <h3>{KryptoniteStore.passageKey}</h3>
        <form>
          <input
           defaultValue= 'Enter the Gettysburg here verbatim to unlock pomo.'
           ref='inputForm'
           type='text'
           className="input-form"
          />
         <p><button onClick={this.handleSubmit}>Submit</button></p>
        </form>
      </div>
    );
  },
});

module.exports = PomoForm;
