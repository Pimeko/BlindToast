import React, { Component } from 'react';

export default class Playlist extends Component {

  render() {
    return (
      <div className="playlist">
        <div className="grey_title">PLAYLIST</div>
        <div className="playlist_container">
          {
            this.props.playlist.map((music) => {
              var title = music.title.length > 21 ? music.title.substring(0, 21) + "..." : music.title;
              var artist = music.artist.length > 21 ? music.artist.substring(0, 21) + "..." : music.artist;
              return <div className="playlist_item">{title} <br/>by {artist}</div>;
            })
          }
        </div>
      </div>
    );
  }
}
