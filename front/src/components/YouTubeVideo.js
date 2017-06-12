import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class YouTubeVideo extends Component {
  onReady(event) {
    event.target.unMute();
    event.target.playVideo();
  }

  onStateChange(event) {
    event.target.unMute();
    event.target.playVideo();
  }

  render() {
    const opts = {
      width: 600,
      height: 400,
      playerVars: {
        start:60
      }
    };

    return (
      <div>
        <YouTube
          videoId={this.props.video.id}
          opts={opts}
          onReady={this.onReady}
          onStateChange={this.onStateChange}
        />
      </div>
    );
  }
}
