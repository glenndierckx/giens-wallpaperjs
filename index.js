const wallpaper = require('wallpaper');
var http = require('http');
var fs = require('fs');
var glob = require('glob');
var request = require('request');
var socket = require('socket.io-client')('http://glenndierckx.be/');

socket.on("new-bg", function (data) {
  let s = data.date;
  var year = parseInt(s.substring(0, 4));
  var month = parseInt(s.substring(4, 6)) - 1;
  var day = parseInt(s.substring(6, 8));
  var hour = parseInt(s.substring(8, 10));
  var minutes = parseInt(s.substring(10, 12));

  var date = new Date(year, month, day, hour, minutes, 0, 0);
  console.log("New background img! " + date);
  var filename = "temp_" + date.getTime() + ".jpg";
  var writeStream = fs.createWriteStream(filename);
  writeStream.on('finish', function () {
    wallpaper.set(filename);
    console.log("done");
    glob("temp_*.jpg", function (er, files) {
      // files is an array of filenames.
      // If the `nonull` option is set, and nothing
      // was found, then files is ["**/*.js"]
      // er is an error object or null.
      files.forEach(x => {
        if(x !== filename)
        {
          fs.unlink(x);
        }
      });
    })
  });
  var imgurl = "http://glenndierckx.be/dynbg/" + date.getTime() + ".jpg";
  request(imgurl).pipe(writeStream);
});

process.stdin.resume();
