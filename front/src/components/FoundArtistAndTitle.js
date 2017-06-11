import React, { Component } from 'react';

export default class FoundArtistAndTitle extends Component {

  render() {
    return (
      <div className="div_found">
        <img src={this.props.authUser.foundArtist ? "artist_full.png" : "artist_empty.png"} className="icon_artist" alt="artist_icon"/>
        <img src={this.props.authUser.foundTitle ? "title_full.png" : "title_empty.png"}  className="icon_title" alt="title_icon"/>
      </div>
    );
  }
}
