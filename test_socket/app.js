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

var clients = [];
var videoList = ["YhtUfOnGJ3E","Rk7B-E4oIWA", "2R-Ikfyh-6Q", "cBU8reYYE10"];
var videoIndex = 0;

io.sockets.on('connection', function (socket) {

  // Sign Up and add in clients[]
  socket.on('signup', function (obj) {
    var pseudo = obj.pseudo;
    console.log('New signup : ' + pseudo);

    connect(socket, pseudo)

    socket.emit('message', 'Connected !');

    socket.on('disconnect', function() {
      disconnect(pseudo)
    });
  });
});

var connect = function(socket, pseudo) {
  clients.push(
    {
      'socket' : socket,
      'pseudo' : pseudo
    });
}

var disconnect = function(pseudo) {
  console.log(pseudo + " disconnected !");

  var i = 0;
  for (var client of clients) {
    if (client.pseudo === pseudo) {
      clients.splice(i, 1);
    }
    i++;
  }
}

var changeVideoIndex = function() {
  videoIndex++;
  if (videoIndex >= videoList.length) {
    videoIndex = 0;
  }
}

var emitNewVideo = function() {
  var currVideo = videoList[videoIndex];
  for (var client of clients) {
    console.log(client.pseudo);
    client.socket.emit("message", "Change video to " + currVideo);
    client.socket.emit('change_video', {"id": currVideo});
  }
}

// Emit every 3 seconds
setInterval(function(){
  console.log();
  console.log("------------");
  console.log("TIMER time ! " + ((clients.length === 0) ? "(empty)" : ""));

  emitNewVideo();
  changeVideoIndex();
}, 3 * 1000);

server.listen(8080);
