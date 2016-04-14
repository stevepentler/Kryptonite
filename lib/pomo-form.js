const React = require('react');
import { ipcRenderer } from 'electron';
import KryptoniteStore from './kryptonite-store';
const PomoForm = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    KryptoniteStore.compareLyrics(this.refs.inputForm.value);
  },

  render() {

    return(
      <div className="statement-form">
        <h3>Gettysburg Address</h3>
        <form>
          <textarea
           defaultValue= 'Enter the Gettysburg here verbatim to unlock pomo.'
           ref='inputForm'
           type='text'
           rows = "10"
           className="input-form form-control form-style"
          />
          <br></br>
         <p><button onClick={this.handleSubmit} className="btn btn-primary btn-lg">Submit</button></p>
        </form>
      </div>
    );
  },
});

module.exports = PomoForm;
