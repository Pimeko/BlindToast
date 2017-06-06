import * as types from '../types';
import { login, change_video } from '../actions'
import { browserHistory } from 'react-router'
import { normalize, schema } from 'normalizr';

const Schemas = {
  user: new schema.Entity('users', {idAttribute: 'id'})
};

var io = require('socket.io-client');

const socketMiddleware = (function(){
  var socket = null;
  var serverUrl = '192.168.141.131:8080/';

  return store => next => action => {
    switch(action.type) {
      case types.SOCKET_CONNECT:
        console.log("connecting to socket")
        socket = io.connect(serverUrl);

        socket.on('message', function(message) {
          console.log('[SERV] ' + message);
        });

        socket.on('login_success', (user) => {

          const normalizedUser = normalize(user, Schemas.user);
          console.log("NORMALIZED : ", normalizedUser);

          console.log("Login success !");
          store.dispatch(login(normalizedUser));
          browserHistory.push('/ingame');

          socket.on('change_video', (video) => {
            console.log("Playing " + video.title + " by " + video.artist);
            store.dispatch(change_video(video));
          })

          socket.on('update_all_users', (users) => {
            console.log("Update all users", users)
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
