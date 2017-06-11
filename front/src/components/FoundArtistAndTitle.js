import React, { Component } from 'react';

export default class FoundArtistAndTitle extends Component {

  render() {
    var classArtist = "icon_artist" + (this.props.miniature ? "_miniature" : "");
    var classTitle = "icon_title" + (this.props.miniature ? "_miniature" : "");
    return (
      <span>
        <img src={this.props.foundArtist ? "artist_full.png" : "artist_empty.png"} className={classArtist} alt="artist_icon"/>
        <img src={this.props.foundTitle ? "title_full.png" : "title_empty.png"}  className={classTitle} alt="title_icon"/>
      </span>
    );
  }
}
