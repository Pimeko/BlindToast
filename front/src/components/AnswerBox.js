import React, { Component } from 'react';

export default class AnswerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  updateInputValue (event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  render() {
    return (
      <div>
        <input value={this.state.inputValue} onChange={this.updateInputValue} placeholder="Your answer"/>
        <button onClick={() => this.props.sendAnswer(this.state.inputValue)}>Answer</button>
      </div>
    );
  }
}
