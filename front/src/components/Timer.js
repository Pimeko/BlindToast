import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      secondsRemaining: 10
    };
    this.tick = this.tick.bind(this);
    this.interval = setInterval(this.tick, 1500);
  }

  componentWillReceiveProps(newProps) {
    console.log("getting new props : ", newProps);
    if (newProps.video.playing && !newProps.video.waitForTheEnd) {
      if (!this.state.isRunning) {
        this.setState({
          isRunning: true,
          secondsRemaining: 10
        })
        clearInterval(this.interval);
        this.interval = setInterval(this.tick, 1500);
      }
    }
    else {
      this.setState({
        secondsRemaining: this.state.secondsRemaining,
        isRunning:false
      })
    }
  }

  tick() {
    this.setState({
      secondsRemaining: this.state.secondsRemaining - 1,
      isRunning: this.state.isRunning
    });
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
  }

  render() {
    var imgPath="toast/Toast_" + this.state.secondsRemaining + ".png";
    return (
      <div>
        {this.state.isRunning ? (
          <center>
            <img src={imgPath} alt="toast"/>
          </center>
        ) : (
          <center>
            <img src="toast/Toast_0.png" alt="toast"/>
          </center>
        )}
      </div>
    );
  }
}
