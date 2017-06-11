import React, { Component } from 'react';

export default class Round extends Component {
  render() {
    return (
      <div className="round">
        Round {this.props.round.currentRound} / {this.props.round.nbRounds}
      </div>
    );
  }
}
