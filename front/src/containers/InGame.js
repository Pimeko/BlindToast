import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socket_change_video } from '../actions'
import { browserHistory } from 'react-router'

// Components
import YouTubeVideo from '../components/YouTubeVideo'

class InGame extends Component {

  // Checks if the user is connected, redirects to / if not
  componentWillMount() {
    if (this.props.userId === '') {
      browserHistory.push('/');
    }
  }

  changeVideo() {
      this.props.dispatch(socket_change_video());
  }

  render() {
    return (
      <div>
        <p>
          In Game, connected with : {this.props.authUser.pseudo}
        </p>
        <YouTubeVideo changeVideo={() => this.changeVideo()} videoId={this.props.videoId}/>
      </div>
    );
  };
}

function mapStateToProps(state) {
  const { entities, auth } = state;

  return {
    userId: auth.userId,
    authUser: entities.users[auth.userId],
  }
}

export default connect(mapStateToProps)(InGame);
