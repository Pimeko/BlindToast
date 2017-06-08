import * as types from '../types';
import {
  login, change_video, end_video, wait_for_the_end,
  answer, update_user, update_round, remove_user,
  reset_playlist
} from '../actions'

import { browserHistory } from 'react-router'
import { normalize } from 'normalizr';
import { schemaUser } from  '../schemas';

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

        socket.on('login_success', (user) => {
          const normalizedUser = normalize(user, schemaUser);

          console.log("Login success !");
          store.dispatch(login(normalizedUser));
          browserHistory.push('/ingame');

          socket.on('change_video', (video) => {
            console.log("Playing " + video.title + " by " + video.artist);
            store.dispatch(change_video(video));
          })

          socket.on('end_video', (currVideo) => {
            console.log("Ending video ");
            store.dispatch(end_video(currVideo));
          })

          socket.on('wait_for_the_end', () => {
            console.log("wait for the end !");
            store.dispatch(wait_for_the_end());
          })

          socket.on('update_round', (round) => {
            console.log("update round");
            store.dispatch(update_round(round));
          })

          socket.on('update_all_users', (users) => {
            console.log("Update all users", users)
            for (var user of users) {
              var normalizedUser = normalize(user, schemaUser);
              store.dispatch(update_user(normalizedUser));
            }
          })

          socket.on('remove_user', (userId) => {
            console.log("Removing user by id ", userId);
            store.dispatch(remove_user(userId));
          })

          socket.on('answer', (result) => {
            store.dispatch(answer(result));
          })

          socket.on('reset_playlist', () => {
            store.dispatch(reset_playlist());
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

      case types.SOCKET_ANSWER:
        if (socket != null) {
          console.log("[socket] answering with " + action.val);

          socket.emit("answer", action.val);
        }
      break;

      default:
        return next(action);
    }
  }

})();

export default socketMiddleware
