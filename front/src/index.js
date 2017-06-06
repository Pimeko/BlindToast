import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
//import { emitMessage } from './services/TestService'

//var io = require('socket.io-client');

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Root store={store} history={history}/>,
  document.getElementById('root')
)

/*
// Receivers
socket.on('message', function(message) {
  console.log('[SERV] ' + message);
});

// Emitters
emitMessage(socket, "ok mon pote");*/
