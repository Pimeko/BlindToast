import React, { Component } from 'react';

// NEED : video, round, users

/*
  - Veuillez attendre la fin de ce toast.
  - C'est parti !
  - Certains mots sont corrects
  - Toast en préparation
  - Le grand toaster est '' avec '' points !
  - Oula, c'est pas du tout ça ...
  - Je vois un grand champion en vous !
*/

export default class Message extends Component {
  constructor (props) {
    super(props);
    this.state = {
      toPrint: "Place au grand toaster !"
    }
  }

  updateMessage(newText) {
    this.setState({
      toPrint: newText
    })
  }

  componentWillReceiveProps(props) {
    if (props.video.waitForTheEnd) {
      this.updateMessage("Veuillez attendre la fin de ce toast.");
    }
    else if (!props.video.playing) {
      // Fin de partie
      if (props.round.currentRound === props.round.nbRounds) {
        props.users.map((user, index) => {
          if (index === 0) {
            this.updateMessage("Le grand toaster est " + user.pseudo + " avec " + user.points + " points !");
          }
          return {};
        });
      }
      else {
        this.updateMessage("Toast en préparation...");
      }
    }
    else {
      this.updateMessage("C'est parti !");
    }
  }

  render() {
    return (
      <div className="message">
        {this.state.toPrint}
      </div>
    );
  }
}
