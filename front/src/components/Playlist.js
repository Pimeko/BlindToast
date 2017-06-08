import React, { Component } from 'react';

export default class Playlist extends Component {

  render() {
    return (
      <div>
        Playlist :
        <ul>
          {
            this.props.playlist.map(function(music){
              return <li>{music.title} by {music.artist}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}
