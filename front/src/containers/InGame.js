import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socket_change_video, socket_answer } from '../actions'
import { browserHistory } from 'react-router'

// Components
import YouTubeVideo from '../components/YouTubeVideo'
//import Users from '../components/Users'
import AnswerBox from '../components/AnswerBox'

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

  sendAnswer(val) {
    this.props.dispatch(socket_answer(val));
  }

  render() {
    return (
      <div>
        <p>
          In Game, connected with : {this.props.authUser.pseudo} <br/>
          Found artist : {this.props.authUser.foundArtist.toString()} <br/>
          Found title : {this.props.authUser.foundTitle.toString()} <br/>
          Wait for the end : {this.props.video.waitForTheEnd.toString()}
        </p>
        <div>
          {this.props.video.playing && !this.props.video.waitForTheEnd?
            <YouTubeVideo changeVideo={() => this.changeVideo()} video={this.props.video} /> : null}
          Playing : {this.props.video.playing.toString()}
        </div>
        <div>
          {this.props.video.playing && !this.props.video.waitForTheEnd ?
            <AnswerBox sendAnswer={(val) => this.sendAnswer(val)}/> : null}
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  const { entities, auth, video } = state;

  return {
    userId: auth.userId,
    authUser: entities.users[auth.userId],
    users: entities.users,
    video: video
  }
}

export default connect(mapStateToProps)(InGame);
