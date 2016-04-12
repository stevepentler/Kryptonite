const React = require('react');
const Timer = React.createClass({

  getInitialState() {
      return { timer: 30 };
  },

  setTimer(event) {
    event.preventDefault();
    this.props.setTimer(this.state);
  },

  handleEdit() {
    this.state.timer = this.refs.timer.value;
    this.initiateTimer();
  },

  initiateTimer() {
    console.log('im here')
    let timer = setInterval(timerTest, 1000);
    let remainingTime = this.state.timer;
    function timerTest(){
      --remainingTime;
      console.log(remainingTime)
      if (remainingTime <= 0) {
        windowEvents.renderPomo();
      }
    }
  },

  render() {
    return(
      <div className="time-interval-form">
        <h3>Set Time Interval</h3>
        <form>
          <input
           defaultValue= '30'
           ref='timer'
           type='text'
           className="time-interval-form"
          />
         <p><button onClick={this.handleEdit}>Start Timer</button></p>
        </form>
      </div>
    )
  },
});

module.exports = Timer;