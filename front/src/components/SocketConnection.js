import React, { Component } from 'react';

export default class SocketConnection extends Component {

  render() {
    return (
      <div>
        <button onClick={() => this.props.connect_to_socket()} >Connect to socket</button>
        <button onClick={() => this.props.socket_emmit("la bite et tout")} >Emmit 'la bite et tout'</button>
      </div>
    );
  }
}
