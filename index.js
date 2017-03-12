const wallpaper = require('wallpaper');
var http = require('http');
var fs = require('fs');
var request = require('request');
var socket = require('socket.io-client')('http://glenndierckx.be/');

socket.on("new-bg", function (data) {
  console.log(data);
  let s = data.date;
  var year = parseInt(s.substring(0, 4));
  var month = parseInt(s.substring(4, 6)) - 1;
  var day = parseInt(s.substring(6, 8));
  var hour = parseInt(s.substring(8, 10));
  var minutes = parseInt(s.substring(10, 12));
  
  var date = new Date(year, month, day, hour, minutes, 0, 0);
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
