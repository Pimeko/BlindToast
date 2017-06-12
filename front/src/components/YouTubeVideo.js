import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class YouTubeVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null
    }

    this.onReady = this.onReady.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.mute = this.mute.bind(this);
    this.unMute = this.unMute.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.state.player != null) {
      // Load next video
      if (!props.video.playing) {
        this.playVideo();
        this.mute();
      }
      else {
        this.unMute();
      }
    }
  }

  onReady(event) {
    this.setState({
      player: event.target,
    });
    this.playVideo();
  }

  onStateChange(event) {
  }

  playVideo() {
    this.state.player.playVideo();
  }

  pauseVideo() {
    this.state.player.pauseVideo();
  }

  mute() {
    this.state.player.mute();
  }

  unMute() {
    this.state.player.unMute();
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
      <div style={{display: 'none'}}>
        <YouTube
          videoId={this.props.video.id}
          opts={opts}
          onReady={this.onReady}
          onStateChange={this.onStateChange}
        />
        <br/>
        <button onClick={this.playVideo}>Play</button>
        <button onClick={this.pauseVideo}>Pause</button>
      </div>
    );
  }
}
