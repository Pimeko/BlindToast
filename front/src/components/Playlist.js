import React, { Component } from 'react';

export default class Playlist extends Component {

  render() {
    return (
      <div className="playlist">
          <div className="grey_title">PLAYLIST</div>
          <div className="playlist_container">
              {
                this.props.playlist.map(function(music){
                  return <div className="playlist_item">{music.title} <br/>by {music.artist}</div>;
                })
              }
          </div>
        </div>
        /*
      <div>
        Playlist :
        <ul>
          {
            this.props.playlist.map(function(music){
              return <li>{music.title} by {music.artist}</li>;
            })
          }
        </ul>
      </div>*/
    );
  }
}
