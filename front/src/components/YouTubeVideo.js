import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class YouTubeVideo extends Component {
  onReady(event) {
    event.target.mute();
    event.target.playVideo();
  }

  onStateChange(event) {
    event.target.mute();
    event.target.playVideo();
  }

  render() {
    const opts = {
      width: 600,
      height: 400
    };

    return (
      <div>
        <p>
          <button onClick={() => this.props.changeVideo()}>Change video</button>
        </p>
        <YouTube
          videoId={this.props.videoId}
          opts={opts}
          onReady={this.onReady}
          onStateChange={this.onStateChange}
        />
      </div>
    );
  }
}
