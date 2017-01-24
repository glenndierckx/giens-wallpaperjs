const wallpaper = require('wallpaper');
var http = require('http');
var fs = require('fs');
var request = require('request');
var socket = require('socket.io-client')('http://glenndierckx.be/');

socket.on("new-bg", function (data) {
  var date = new Date(data.date);
  console.log("New background img! " + date);
  var writeStream = fs.createWriteStream("file.jpg");
  writeStream.on('finish', function () {
    wallpaper.set("file.jpg");
    console.log("done");
  });
  var imgurl = "http://glenndierckx.be/dynbg/" + date.getTime() + ".jpg";
  request(imgurl).pipe(writeStream);
});

process.stdin.resume();
