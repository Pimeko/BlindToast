import * as types from '../types';
import { login } from '../actions'
import { browserHistory } from 'react-router'

var io = require('socket.io-client');

const socketMiddleware = (function(){
  var socket = null;
  var serverUrl = 'http://localhost:8080/';

  return store => next => action => {
    switch(action.type) {
      case types.SOCKET_CONNECT:
        console.log("connecting to socket")
        socket = io.connect(serverUrl);

        socket.on('message', function(message) {
          console.log('[SERV] ' + message);
        });

        socket.on('login_success', (obj) => {
          console.log("Login success !");
          store.dispatch(login(obj.pseudo));
          browserHistory.push('/ingame');
        });

        socket.on('login_failed', (message) => {
          console.log("Login failed : " + message)
        });
      break;

      case types.SOCKET_EMMIT:
        if (socket != null) {
          console.log("emitting message");
          socket.emit("message", action.message);
        }
      break;

      case types.SOCKET_LOGIN:
        if (socket != null) {
          console.log("login with " + action.pseudo);

          socket.emit("login", {
            'pseudo': action.pseudo
          });
        }
      break;

      default:
        return next(action);
    }
  }

})();

export default socketMiddleware
