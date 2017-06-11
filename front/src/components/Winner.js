import React, { Component } from 'react';

export default class Winner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerPseudo: {},
      winnerPoints: {}
    }
  }

  componentWillReceiveProps(props) {
    props.users.map((user, index) => {
      if (index === 0) {
        this.setState({
          winnerPseudo: user.pseudo,
          winnerPoints: user.points
        })
      }
      return {};
    });
  }

  render() {
    var toPrint = this.props.authUserPseudo === this.state.winnerPseudo ? "Bravo vous avez gagné !" :
    "Le gagnant est " + this.state.winnerPseudo + " avec " + this.state.winnerPoints + " points !"
    return (
      <div>
        <h2>
          {toPrint}
        </h2>
      </div>
    );
  }
}
