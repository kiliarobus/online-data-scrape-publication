// storing dependencies in variables
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var url = require('url');

var port = 3000;
var app = express();

var DOWNLOAD_DIR = './';

app.get('/lyricsfour', function(req, res) {

  var url = "https://www.azlyrics.com/lyrics/tydollasign/bootypoppin.html";

  // let's make the http request to the url above using the 'request' dependency
  request(url, function(error, response, html) {
    // only execute if there's no error
    if( !error ){

      // we can use the dependency 'cheerio' to traverse the DOM and use jQuery-like selectors and functions
      var $ = cheerio.load(html);

      // let's create a javascript object to save our data in
      var lyrics_list= [];

      // all the content we are looking for are inside a div with the id 'content', let's filter so that the data we are working with is without unnecessary data

      $( '.ringtone' ).nextAll( 'div' ).filter(function(){
            $(this).contents( ).each(function(i, elem){
              var line = $( this ).text().trim( );
              line = line.split( '\n' ).join( ' ' ).trim( );

              if ( line != '' )
                lyrics_list.push( $(this).text() );
            });

      });

      // send the data we've stored in our object back to the browser
      console.log( lyrics_list );
      res.send(lyrics_list);

      fs.writeFile('./azlyricsfour_output.js', "var azlyricsfour_output = " + lyrics_list, function(error){
        console.log("File is written successfully!");
      });
    }
  });
});

app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;
