import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socket_emmit } from '../actions'
import { browserHistory } from 'react-router'

class InGame extends Component {
  
  // Checks if the user is indeed connected, or redirects to /
  componentWillMount() {
    if (this.props.pseudo === '') {
      browserHistory.push('/');
    }
  }

  socket_emmit(message) {
    this.props.dispatch(socket_emmit(message));
  }

  render() {
    return (
      <div>
        <p>
          In Game !
        </p>
      </div>
    );
  };
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    pseudo: user.pseudo
  }
}

export default connect(mapStateToProps)(InGame);
