import React, { Component } from 'react';

export default class TestIncrementor extends Component {

  increment() {
    this.props.increment();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.increment()} >Increment</button>
        <p>
          Increment value : {this.props.count}
        </p>
      </div>
    );
  }
}
