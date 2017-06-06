import React, { Component } from 'react';

export default class Maximilien extends Component {

  changeMaximilienValue() {
    this.props.changeMaximilienValue();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.changeMaximilienValue()} >Change Maximilien value to 'lolilol'</button>
        <p>
          Maximilien value : {this.props.value}
        </p>
      </div>
    );
  }
}
