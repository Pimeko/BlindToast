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
var videosPlayed = [];

var videoIndex = 0;
var currVideo = {};
var titlesList = [];
var artistsList = [];
var musicPlaying = false;
var nbMusicsPlayed = 0;
var nbMusicsPerRound = 2;
var musicTime = 10, pauseTime = 5;

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
        onAnswer(socket, val, pseudo)
      });

      socket.on('change_video', function() {
        changeVideo();
      })
    }
  });
});

function updateClientToSendLocal(newClient) {
    i = 0;
    for (var client of clientsToSend) {
      if (client.id === newClient.id) {
        client.pseudo = newClient.pseudo;
        client.foundTitle = newClient.foundTitle;
        client.foundArtist = newClient.foundArtist;
      }
      i++;
    }
}


function updateClientLocal(newClient) {
    i = 0;
    for (var client of clients) {
      if (client.id === newClient.id) {
        client.pseudo = newClient.pseudo;
        client.titlesList = newClient.titlesList;
        client.artistsList = newClient.artistsList;
      }
      i++;
    }
}

function login(socket, pseudo) {
  var newClient = {
    'id'            : crypto.randomBytes(16).toString("hex"),
    'socket'        : socket,
    'pseudo'        : pseudo,
    'titlesFound'   : [],
    'artistsFound'  : [],
    'points'        : 0
  };
  clients.push(newClient);

  var clientToSend = {
    'id'            : newClient.id,
    'pseudo'        : newClient.pseudo,
    'foundTitle'    : false,
    'foundArtist'   : false,
    'points'        : newClient.points
  };
  clientsToSend.push(clientToSend);

  console.log('New login : ', clientToSend);
  socket.emit("login_success", clientToSend);
  updateRound(socket);
  if (musicPlaying) {
    socket.emit('wait_for_the_end');
  }

  updateAllUsers(socket);
}

function disconnect(socket, pseudo) {
  console.log(pseudo + " disconnected !");
  var userId = getClientByPseudo(pseudo).id;

  var i = 0;
  for (var client of clients) {
    if (client.pseudo === pseudo) { clients.splice(i, 1); }
    i++;
  }

  i = 0;
  for (var client of clientsToSend) {
    if (client.pseudo === pseudo) { clientsToSend.splice(i, 1); }
    i++;
  }

  //updateAllUsers(socket);
  socket.broadcast.emit("remove_user", userId);
}

// Give the new list of users for each users connected to the socket
function updateAllUsers(socket) {
  socket.emit("update_all_users", clientsToSend);
  socket.broadcast.emit("update_all_users", clientsToSend);
}

// min inclusive, max inclusive
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeVideoIndex() {
  do {
    videoIndex = getRandomInt(0, videoList.length - 1);
  } while (videoIndex in videosPlayed);

  videosPlayed.push(videoIndex);
}

function splitAndLower(array) {
  var res = [];
  var temp = array.split(" ");
  for (var t of temp) {
    res.push(t.toLowerCase());
  }
  return res;
}

function updateRound(socket) {
  var objToSend = {
    'currentRound' : nbMusicsPlayed,
    'nbRounds' : nbMusicsPerRound
  };
  console.log("new round", objToSend);
  socket.emit('update_round', objToSend);
}

function emitNewVideo() {
  currVideo = videoList[videoIndex];
  titlesList = splitAndLower(currVideo.title);
  artistsList = splitAndLower(currVideo.artist);

  console.log("New music : " + currVideo.title + " by " + currVideo.artist)
  for (var client of clients) {
    console.log(client.pseudo);

    client.socket.emit("message", "Change video to " + currVideo.title);
    client.socket.emit('change_video', currVideo);
    updateRound(client.socket);
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

function getClientToSendByPseudo(pseudo) {
    var res = null;
    for (var client of clientsToSend) {
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

function onAnswer(socket, val, pseudo) {
  console.log("Got answer " + val + " from " + pseudo);
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

  updateClientLocal(currClient);

  var currClientToSend = getClientToSendByPseudo(pseudo);
  if (!hadTitle) {
    currClientToSend.foundTitle = currClient.titlesFound.length === titlesList.length;
  }
  if (!hadArtist) {
    currClientToSend.foundArtist = currClient.artistsFound.length === artistsList.length;
  }

  socket.emit("message", "Found at least one : " + foundAtLeastOne);

  if (!hadTitle && currClient.titlesFound.length === titlesList.length) {
    currClientToSend.points++;
    socket.emit("message", "Found title !");
  }

  if (!hadArtist && currClient.artistsFound.length === artistsList.length) {
    currClientToSend.points++;
    socket.emit("message", "Found artist !");
  }

  updateClientToSendLocal(currClientToSend);
  updateAllUsers(socket);
}

function changeVideo() {
  console.log();
  console.log("------------");
  console.log("Updating " + ((clients.length === 0) ? "(no users)" : ""));

  var endOfRound = nbMusicsPlayed === nbMusicsPerRound;
  if (endOfRound) {
    console.log("End of round !");
    restartGame();
    nbMusicsPlayed = 1;
  }
  else {
    nbMusicsPlayed++;
  }

  musicPlaying = true;
  emitNewVideo();
  changeVideoIndex();
}

function restartGame() {
  videosPlayed = [];
  for (var client of clients) {
    console.log(client.pseudo);

    // Reset client
    var currClientToSend = getClientToSendByPseudo(client.pseudo);
    currClientToSend.foundTitle = false;
    currClientToSend.foundArtist = false;
    currClientToSend.points = 0;

    updateClientToSendLocal(currClientToSend);
    updateAllUsers(client.socket);
    client.socket.emit('reset_playlist');
  }
}

function loopMusic() {
  changeVideo();
  setTimeout(function() {
    endMusic();
  }, musicTime * 1000);
}

// Emit every n seconds
loopMusic();
setInterval(loopMusic, (musicTime + pauseTime) * 1000);

function endMusic() {
  console.log("ending music");
  musicPlaying = false;
  emitEndMusic();
}

function emitEndMusic() {
  for (var client of clients) {
    console.log(client.pseudo);

    // Reset client
    var currClient = getClientByPseudo(client.pseudo);
    currClient.artistsFound = [];
    currClient.titlesFound = [];
    updateClientLocal(currClient);

    var currClientToSend = getClientToSendByPseudo(client.pseudo);
    currClientToSend.foundTitle = false;
    currClientToSend.foundArtist = false;

    client.socket.emit("message", "End video");
    client.socket.emit('end_video', currVideo);
    updateClientToSendLocal(currClientToSend);
    updateAllUsers(client.socket);
  }
}

console.log("Server started on port 8080 :)");
server.listen(8080);
