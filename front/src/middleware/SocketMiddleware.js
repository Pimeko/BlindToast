import * as types from '../types';
import { login, change_video } from '../actions'
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

          socket.on('change_video', (video) => {
            console.log("Playing " + video.title + " by " + video.artist);
            store.dispatch(change_video(video));
          })
        });

        socket.on('login_failed', (message) => {
          console.log("Login failed : " + message)
        });
      break;

      case types.SOCKET_EMIT:
        if (socket != null) {
          console.log("[socket] emitting message");
          socket.emit("message", action.message);
        }
      break;

      case types.SOCKET_LOGIN:
        if (socket != null) {
          console.log("[socket] login with " + action.pseudo);

          socket.emit("login", {
            'pseudo': action.pseudo
          });
        }
      break;

      case types.SOCKET_CHANGE_VIDEO:
        if (socket != null) {
          console.log("[socket] changing video");

          socket.emit("change_video");
        }
      break;

      default:
        return next(action);
    }
  }

})();

export default socketMiddleware
