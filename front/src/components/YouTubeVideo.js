import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class YouTubeVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: '2g811Eo7K8U'
    }
  }

  changeVideo() {
    this.setState({
      videoId: 'YhtUfOnGJ3E'
    });
  }

  _onReady(event) {
    event.target.unMute();
    event.target.playVideo();
  }

  render() {
    const opts = {
      width: 600,
      height: 400,
      start: 60,
      end: 80
    };

    return (
      <div>
        <p>
          <button onClick={() => this.changeVideo()}>Change video</button>
        </p>
        <YouTube
          videoId={this.state.videoId}
          opts={opts}
          onReady={this._onReady}
        />
      </div>
    );
  }
}
