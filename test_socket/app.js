var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
var io = require('socket.io').listen(server);
var path = require('path');

// 10 musiques de 15 secondes avec 5 secondes de break
var clients = [];
var videoList = [
  {'id' : "YhtUfOnGJ3E", 'artist' : 'Timber Timbre', 'title' : 'Trouble comes knocking'},
  {'id' : "Rk7B-E4oIWA", 'artist' : 'Timber Timbre', 'title' : 'Lay down in the tall grass'},
  {'id' : "2R-Ikfyh-6Q", 'artist' : 'Timber Timbre', 'title' : 'Lonesome Hunter'},
  {'id' : "cBU8reYYE10", 'artist' : 'Timber Timbre', 'title' : 'We\'ll Find Out'}];
var videoIndex = 0;
var currVideo = {};

io.sockets.on('connection', function (socket) {
  socket.on('signup', function (obj) {
    var pseudo = obj.pseudo;
    console.log('New signup : ' + pseudo);

    connect(socket, pseudo);

    socket.on('disconnect', function() {
      disconnect(pseudo)
    });

    socket.on('answer', function(val) {
      answer(socket, val)
    })

  });
});

function connect(socket, pseudo) {
  clients.push({
    'socket' : socket,
    'pseudo' : pseudo
  });
  socket.emit('connection_success');
}

function disconnect(pseudo) {
  console.log(pseudo + " disconnected !");

  var i = 0;
  for (var client of clients) {
    if (client.pseudo === pseudo) { clients.splice(i, 1); }
    i++;
  }
}

function changeVideoIndex() {
  videoIndex++;
  if (videoIndex >= videoList.length) {
    videoIndex = 0;
  }
}

function emitNewVideo() {
  currVideo = videoList[videoIndex];
  for (var client of clients) {
    console.log(client.pseudo);
    client.socket.emit("message", "Change video to " + currVideo.title);
    client.socket.emit('change_video', currVideo);
  }
}

function answer(socket, val) {
  console.log("got answer '" + val + "'");
  socket.emit('message', currVideo.title == val ? "good title" : "bad title");
}

// Emit every 3 seconds
setInterval(function(){
  console.log();
  console.log("------------");
  console.log("Updating " + ((clients.length === 0) ? "(empty)" : ""));

  emitNewVideo();
  changeVideoIndex();
}, 20 * 1000);

server.listen(8080);
