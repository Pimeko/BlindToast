import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socket_connect, socket_login } from '../actions'

// Components
import Header from '../components/Header'
import Login from '../components/Login'
import Footer from '../components/Footer'

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
        <Header/>
        <div className="box">
          <h2>Choisissez votre pseudo :</h2>
          <Login login={(pseudo) => this.login(pseudo)}/>
        </div>
        <Footer/>
      </div>
    );
  };
}

function mapStateToProps(state) {
  const { auth } = state;

  return {
    authId: auth.userId
  }
}

export default connect(mapStateToProps)(Home);
