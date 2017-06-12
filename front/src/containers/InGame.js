import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socket_answer } from '../actions'
import { browserHistory } from 'react-router'

// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import YouTubeVideo from '../components/YouTubeVideo'
import Users from '../components/Users'
import AnswerBox from '../components/AnswerBox'
import Playlist from '../components/Playlist'
import FoundArtistAndTitle from '../components/FoundArtistAndTitle'
import Winner from '../components/Winner'
import Timer from '../components/Timer'
import Round from '../components/Round'

class InGame extends Component {

  // Checks if the user is connected, redirects to / if not
  componentWillMount() {
    if (this.props.authUser === "") {
      browserHistory.push('/');
    }
  }

  sendAnswer(val) {
    this.props.dispatch(socket_answer(val));
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="box">
          <Round round={this.props.round}/>
          <br/>
          <Timer video={this.props.video}/>
<br/>
          {this.props.round.currentRound === this.props.round.nbRounds && !this.props.video.playing && (
            <Winner authUserPseudo={this.props.authUser.pseudo} users={this.props.users}/>
          )}

          <div className="div_found">
            <FoundArtistAndTitle foundArtist={this.props.authUser.foundArtist}
              foundTitle={this.props.authUser.foundTitle} miniature={false}/>
          </div>
          <br/>

          <AnswerBox isActive={this.props.video.playing && !this.props.video.waitForTheEnd}
            sendAnswer={(val) => this.sendAnswer(val)}/>

          <div style={{display: 'none'}}>
            {this.props.video.playing && !this.props.video.waitForTheEnd && (
              <YouTubeVideo video={this.props.video} />
            )}
          </div>
          <Users users={this.props.users} authUserPseudo={this.props.authUser.pseudo}/>
          <Playlist playlist={this.props.video.playlist}/>
        </div>
        <Footer/>
      </div>
    );
  };
}

function mapStateToProps(state) {
  const { entities, auth, video, round, users } = state;
  const usersList = users.values.map((id) => entities.users[id]).sort(function(a, b) {
    return b.points - a.points;
  });

  return {
    authUser: ('users' in entities && auth.userId in entities.users) ? entities.users[auth.userId] : "",
    users: usersList,
    video: video,
    round: round
  }
}

export default connect(mapStateToProps)(InGame);
