import React, { Component } from 'react';

export default class Login extends Component {
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
        <input value={this.state.inputValue} onChange={this.updateInputValue}/>
        <button onClick={() => this.props.login(this.state.inputValue)} >Login</button>
      </div>
    );
  }
}
