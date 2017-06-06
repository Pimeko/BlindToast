import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, change_maximilien, socket_connect, socket_emmit } from '../actions'
import TestIncrementor from '../components/TestIncrementor'
import Maximilien from '../components/Maximilien'
import SocketConnection from '../components/SocketConnection'

class Test extends Component {
  increment() {
    this.props.dispatch(increment());
  }

  changeMaximilienValue() {
    this.props.dispatch(change_maximilien("lolilol"));
  }

  connect_to_socket() {
    this.props.dispatch(socket_connect());
  }

  socket_emmit(message) {
    this.props.dispatch(socket_emmit(message));
  }

  render() {
    return (
      <div>
        <p>
          Now is connection time.
        </p>
        <TestIncrementor count={this.props.count} increment={() => this.increment()} />
        <Maximilien value={this.props.maximilien_value} changeMaximilienValue={() => this.changeMaximilienValue()}/>
        <SocketConnection connect_to_socket={() => this.connect_to_socket()} socket_emmit={(message) => this.socket_emmit(message)} />
      </div>
    );
  };
}

function mapStateToProps(state) {
  const { test, maximilien } = state;

  return {
    count: test.count,
    maximilien_value: maximilien.value
  }
}

export default connect(mapStateToProps)(Test);
