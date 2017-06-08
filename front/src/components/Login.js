import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.updateInputValue = this.updateInputValue.bind(this);
    this.login = this.login.bind(this);
  }

  updateInputValue (event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  login() {
      this.props.login(this.state.inputValue);
  }

  handleEnterInput(event, _this) {
    if (event.key === 'Enter') {
      _this.login();
    }
  }

  render() {
    return (
      <div>
        <input value={this.state.inputValue} onChange={this.updateInputValue} onKeyPress={(event) => this.handleEnterInput(event, this)}/>
        <button onClick={() => this.login}>Login</button>
      </div>
    );
  }
}
