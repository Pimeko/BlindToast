import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socket_connect, socket_login } from '../actions'

// Components
import Login from '../components/Login'

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(socket_connect());
  }

  login(pseudo) {
    this.props.dispatch(socket_login(pseudo));
  }

  render() {
    return (
      <div>
        <p>
          Welcome to blind toast !
        </p>
        <Login login={(pseudo) => this.login(pseudo)}/>
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

export default connect(mapStateToProps)(Home);
