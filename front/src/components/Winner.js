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
    console.log("WINNER" + this.state.winnerPseudo + " " + this.state.winnerPoints)
    var winnerPseudo = this.state.winnerPseudo.toString();
    var winnerPoints = this.state.winnerPoints.toString();
    var toPrint = this.props.authUserPseudo === winnerPseudo ? "Bravo vous avez gagné !" :
    "Le gagnant est " + winnerPseudo + " avec " + winnerPoints + " points !"
    return (
      <div>
        {toPrint}
      </div>
    );
  }
}
