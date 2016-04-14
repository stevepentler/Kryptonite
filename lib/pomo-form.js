const React = require('react');
import { ipcRenderer } from 'electron';

const PomoForm = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    pomo.checkStatement(this.refs.workTimer.value, this.refs.pomoTimer.value);
    timer.toggleActive();
    timer.initiateTimer();
  },

  render() {

    return(
      <div className="statement-form">
        <h3>Gettysburg Address</h3>
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
