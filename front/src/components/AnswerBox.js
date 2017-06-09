import React, { Component } from 'react';

export default class AnswerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.updateInputValue = this.updateInputValue.bind(this);
    this.sendAnswer = this.sendAnswer.bind(this);
  }

  updateInputValue (event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  sendAnswer() {
    this.props.sendAnswer(this.state.inputValue);
    this.inputAnswer.value = "";
    this.setState({
      inputValue: ""
    });
  }

  handleEnterInput(event, _this) {
    if (event.key === 'Enter') {
      _this.sendAnswer();
    }
  }

  render() {
    return (
      <div>
        <input value={this.state.inputValue} onChange={this.updateInputValue}
          onKeyPress={(event) => this.handleEnterInput(event, this)} placeholder="Votre réponse"
          ref={(el) => this.inputAnswer = el} className="input_answer" type="text"/>
        <button onClick={() => this.sendAnswer()} className="ok_button">OK</button>
      </div>
    );
  }
}
