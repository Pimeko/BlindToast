import React, { Component } from 'react'
import { connect } from 'react-redux'
//import {  } from '../actions'
import { browserHistory } from 'react-router'

// Components
import YouTubeVideo from '../components/YouTubeVideo'

class InGame extends Component {

  // Checks if the user is connected, redirects to / if not
  componentWillMount() {
    if (this.props.pseudo === '') {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <div>
        <p>
          In Game !
        </p>
        <YouTubeVideo />
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
