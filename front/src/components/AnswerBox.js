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
    this.clearInput();
  }

  handleEnterInput(event, _this) {
    if (event.key === 'Enter') {
      _this.sendAnswer();
    }
  }

  clearInput() {
    this.inputAnswer.value = "";
    this.setState({
      inputValue: ""
    });
  }

  componentWillReceiveProps(props) {
    if (!props.isActive) {
      this.clearInput();
    }
  }

  render() {
    return (
      <div>
        <input value={this.state.inputValue} onChange={this.updateInputValue}
          onKeyPress={(event) => this.handleEnterInput(event, this)} placeholder={this.props.isActive ? "Votre réponse" : "Patientez..." }
          ref={(el) => this.inputAnswer = el} className={this.props.isActive ? "input_answer" : "input_answer_disabled"}
          type="text" readOnly={!this.props.isActive} autoFocus/>
        <button onClick={() => {if (this.props.isActive) { this.sendAnswer(); }}} className="ok_button">OK</button>
      </div>
    );
  }
}
