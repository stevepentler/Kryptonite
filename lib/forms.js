const React = require('react');
import timer from './timer';
import { ipcRenderer } from 'electron';
import MainForm from './main-form';
import PomoForm from './pomo-form';

const Forms = React.createClass({

  pomoSwitch(){
    if (this.props.pomo && this.props.timerActive){
      return <div><PomoForm /></div>;
    } else {
      return <div></div>;
    }
  },

  mainSwitch(){
    if(!this.props.pomo && !this.props.timerActive){
      return <div><MainForm /></div>;
    } else {
      return <div></div>;
    }
  },

  render() {

    return(

      this.props.pomo ? this.pomoSwitch() : this.mainSwitch()

    );
  },
});



module.exports = Forms;
