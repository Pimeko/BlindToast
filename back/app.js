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
  {'id' : "JiUNTdFX8G8", 'artist' : 'Eminem Rihanna', 'title' : 'Love the way you lie'},
  {'id' : "M-GYWxCqepI", 'artist' : 'Ed Sheeran', 'title' : 'Shape of you'},
  {'id' : "Pvq_dzWMeeM", 'artist' : 'Julian Perretta', 'title' : 'Wonder Why'},
  {'id' : "DUT5rEU6pqM", 'artist' : 'Shakira', 'title' : 'Hips don\'t lie'},
  {'id' : "IS6n2Hx9Ykk", 'artist' : 'Led Zeppelin', 'title' : 'Stairway to heaven'},
  {'id' : "VJDJs9dumZI", 'artist' : 'The Beatles', 'title' : 'While my guitar gently weeps'},
  {'id' : "ih-8K1a_SsA", 'artist' : 'The Beatles', 'title' : 'Let it be'},
  {'id' : "4VR2T5n6tSE", 'artist' : 'Coldplay', 'title' : 'Viva la vida'},
  {'id' : "1uYWYWPc9HU", 'artist' : 'Radiohead', 'title' : 'Karma Police'},
  {'id' : "uJ_1HMAGb4k", 'artist' : 'Vance Joy', 'title' : 'Riptide'},
  {'id' : "pI2Q8L8L3Ks", 'artist' : 'Maroon 5', 'title' : 'This Love'},
  {'id' : "3ksDzlmoU8E", 'artist' : 'Aaron', 'title' : 'Lili'},
  {'id' : "yb_uI5iLesQ", 'artist' : 'Orelsan', 'title' : 'La terre est ronde'},
  {'id' : "tC5IiYpozuE", 'artist' : 'Alicia Keys', 'title' : 'No one'},
  {'id' : "rs6Y4kZ8qtw", 'artist' : 'Manu Chao', 'title' : 'Me gustas tu'},
  {'id' : "-5m1enOt0OQ", 'artist' : 'Britney Spears', 'title' : 'Baby one more time'},
  {'id' : "EC7Re8cczj0", 'artist' : 'Carla Bruni', 'title' : 'Quelqu\'un m\'a dit'},
  {'id' : "gx37CH4_FoM", 'artist' : 'Vianney', 'title' : 'Je m\'en vais'},
  {'id' : "ZdlE2VBTAUA", 'artist' : 'Black Eyed Peas', 'title' : 'Shut Up'},
  {'id' : "jLlmNbuzUUE", 'artist' : 'Axelle Red', 'title' : 'Sensualité'},
  {'id' : "TIUwLfpufs0", 'artist' : 'Red Hot Chili Peppers', 'title' : 'Can\'t Stop'},
  {'id' : "XdAvX0Mvm4c", 'artist' : 'Stromae', 'title' : 'Formidable'},
  {'id' : "X024NEsDyC8", 'artist' : 'Katy Perry', 'title' : 'I kissed a girl'},
  {'id' : "T2PAkPp0_bY", 'artist' : 'Michael Jackson', 'title' : 'Beat it'},
  {'id' : "1BdPDaFXcEo", 'artist' : 'Celine Dion', 'title' : 'My heart will go on'},
  {'id' : "qcOK_YATp6U", 'artist' : 'Green Day', 'title' : '21 Guns'},
  {'id' : "ZrujXrB1_aE", 'artist' : 'Muse', 'title' : 'Time is running out'},
  {'id' : "3KHJKj9GgsI", 'artist' : 'Kean', 'title' : 'Somewhere only we know'},
  {'id' : "As_Yk5sW0Pw", 'artist' : 'Guns N\' Roses', 'title' : 'Paradise City'},
  {'id' : "KXJNoC6CuYE", 'artist' : 'Fun', 'title' : 'We are young'},
  {'id' : "f5shipypasU", 'artist' : 'BB Brunes', 'title' : 'Dis moi'},
  {'id' : "tCnBrrnOefs", 'artist' : 'Justice', 'title' : 'DANCE'},
  {'id' : "v6rfv5Pb6R4", 'artist' : 'Estelle', 'title' : 'American Boy'},
  {'id' : "JjW5ygsyjTI", 'artist' : 'Amy Winehouse', 'title' : 'Rehab'},
  {'id' : "FWBHHg6jplY", 'artist' : 'Daft Punk', 'title' : 'Instant Crush'},
  {'id' : "DqRC5tquyU0", 'artist' : 'Gotye', 'title' : 'Somebody that I used to know'},
  {'id' : "t0imaSCnSuA", 'artist' : 'Hozier', 'title' : 'Take me to church'},
  {'id' : "gN3gNuRdVmg", 'artist' : 'Rihanna', 'title' : 'Umbrella'}
];
var videosPlayed = [];

var videoIndex = 0;
var currVideo = {};
var titlesList = [];
var artistsList = [];
var musicPlaying = false;
var nbMusicsPlayed = 0;
var nbMusicsPerRound = 10;
var musicTime = 15, pauseTime = 5;

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
  currVideo = videoList[videoIndex];
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

  var answerToSend = {
    'foundTitle' : false,
    'foundArtist' : false,
    'foundAtLeastOne' : foundAtLeastOne
  }
  socket.emit("message", "Found at least one : " + foundAtLeastOne);

  if (!hadTitle && currClient.titlesFound.length === titlesList.length) {
    currClientToSend.points++;
    socket.emit("message", "Found title !");
    answerToSend.foundTitle = true;
  }

  if (!hadArtist && currClient.artistsFound.length === artistsList.length) {
    currClientToSend.points++;
    socket.emit("message", "Found artist !");
    answerToSend.foundArtist = true;
  }

  socket.emit("answer", answerToSend);

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

changeVideoIndex();
currVideo = videoList[videoIndex];
// Emit every n seconds
loopMusic();
setInterval(loopMusic, (musicTime + pauseTime) * 1000);

function endMusic() {
  console.log("ending music");
  musicPlaying = false;
  emitEndMusic();
}

function emitEndMusic() {
  var prevVideo = currVideo;
  changeVideoIndex();

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
    client.socket.emit('end_video', {
      'prevVideo': prevVideo,
      'newVideoId': videoList[videoIndex].id
    });
    updateClientToSendLocal(currClientToSend);
    updateAllUsers(client.socket);
  }
}

console.log("Server started on port 8080 :)");
server.listen(8080);
