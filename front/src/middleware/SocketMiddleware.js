import * as types from '../types';

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
        break;

        case types.SOCKET_EMMIT:
          console.log("emitting message")
          socket.emit("message", action.message);
        break;

      default:
        return next(action);
    }
  }

})();

export default socketMiddleware
