var http = require('http');
var fs = require('fs');
const crypto = require("crypto");

/*
// Remove comment to use index.html front
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});*/

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Server running !');
});

var io = require('socket.io').listen(server);
var path = require('path');

// 10 musiques de 15 secondes avec 5 secondes de break
var clients = [];
var clientsToSend = [];
var videoList = [
  {'id' : "YhtUfOnGJ3E", 'artist' : 'Timber Timbre', 'title' : 'Trouble comes knocking'},
  {'id' : "Rk7B-E4oIWA", 'artist' : 'Timber Timbre', 'title' : 'Lay down in the tall grass'},
  {'id' : "2R-Ikfyh-6Q", 'artist' : 'Timber Timbre', 'title' : 'Lonesome Hunter'},
  {'id' : "cBU8reYYE10", 'artist' : 'Timber Timbre', 'title' : 'We\'ll Find Out'}];
var videoIndex = 0;
var currVideo = {};
var titlesList = [];
var artistsList = [];

io.sockets.on('connection', function (socket) {
  socket.on("message", function (message) {
    console.log("[CLIENT] " + message);
  })
  console.log("New visitor !")
  socket.emit("message", "you are a new visitor");

  socket.on('login', function (obj) {
    var pseudo = obj.pseudo;

    var alreadyTaken = false;
    for (var p of clients) {
      if (p.pseudo === pseudo) {
        alreadyTaken = true;
      }
    }

    if (alreadyTaken) {
      socket.emit("login_failed", "Pseudo already taken !");
    }
    else {

      login(socket, pseudo);

      socket.on('disconnect', function() {
        disconnect(socket, pseudo)
      });

      socket.on('answer', function(val) {
        answer(socket, val, pseudo)
      });

      socket.on('change_video', function() {
        changeVideo();
      })
    }
  });
});

function login(socket, pseudo) {
  var newClient = {
    'id'            : crypto.randomBytes(16).toString("hex"),
    'socket'        : socket,
    'pseudo'        : pseudo,
    'titlesFound'   : [],
    'artistsFound'  : []
  };

  clients.push(newClient);
  var clientToSend = {
    'id' : newClient.id,
    'pseudo' : newClient.pseudo
  };
  clientsToSend.push(clientToSend);
  socket.emit("login_success", clientToSend);
  console.log('New login : ', clientToSend);

  updateAllUsers(socket);
}

function disconnect(pseudo) {
  console.log(pseudo + " disconnected !");

  var i = 0;
  for (var client of clients) {
    if (client.pseudo === pseudo) { clients.splice(i, 1); }
    i++;
  }

  i = 0;
  for (var client of clientsToSend) {
    if (clientsToSend.pseudo === pseudo) { clientsToSend.splice(i, 1); }
    i++;
  }

  updateAllUsers(socket);
}

// Give the new list of users for each users connected to the socket
function updateAllUsers(socket) {
  socket.emit("update_all_users", clientsToSend);
  socket.broadcast.emit("update_all_users", clientsToSend);
}

function changeVideoIndex() {
  videoIndex++;
  if (videoIndex >= videoList.length) {
    videoIndex = 0;
  }
}

function splitAndLower(array) {
  var res = [];
  var temp = array.split(" ");
  for (var t of temp) {
    res.push(t.toLowerCase());
  }
  return res;
}

function emitNewVideo() {
  currVideo = videoList[videoIndex];
  titlesList = splitAndLower(currVideo.title);
  artistsList = splitAndLower(currVideo.artist);

  for (var client of clients) {
    console.log(client.pseudo);
    client.socket.emit("message", "Change video to " + currVideo.title);
    client.socket.emit('change_video', currVideo);
  }
}

function getClientByPseudo(pseudo) {
    var res = null;
    for (var client of clients) {
      if (client.pseudo === pseudo) {
        res = client;
      }
    }
    return res;
}

function keyExists(key, array) {
  for (var k of array) {
    if (k === key) {
      return true;
    }
  }
  return false;
}

function answer(socket, val, pseudo) {
  var currClient = getClientByPseudo(pseudo);
  var answerArray = splitAndLower(val);
  var foundAtLeastOne = false;
  var hadTitle = currClient.titlesFound.length === titlesList.length;
  var hadArtist = currClient.artistsFound.length === artistsList.length;

  for (var word of answerArray) {
    if (keyExists(word, titlesList) && !keyExists(word, currClient.titlesFound)) {
      currClient.titlesFound.push(word);
      foundAtLeastOne = true;
    }

    if (keyExists(word, artistsList) && !keyExists(word, currClient.artistsFound)) {
      currClient.artistsFound.push(word);
      foundAtLeastOne = true;
    }
  }

  socket.emit("message", "Found at least one : " + foundAtLeastOne);

  if (!hadTitle && currClient.titlesFound.length === titlesList.length) {
    socket.emit("message", "Found title !");
  }

  if (!hadArtist && currClient.artistsFound.length === artistsList.length) {
    socket.emit("message", "Found artist !");
  }
}

/*
// Emit every n seconds
setInterval(function(){
  changeVideo();
}, 6 * 1000);
*/

function changeVideo() {
  console.log();
  console.log("------------");
  console.log("Updating " + ((clients.length === 0) ? "(empty)" : ""));

  emitNewVideo();
  changeVideoIndex();
}

console.log("Server started on port 8080 :)");
server.listen(8080);
