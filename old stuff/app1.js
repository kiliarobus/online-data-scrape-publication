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

let write_output = function( destination, varname, content ) {
  fs.writeFile( './' + destination, 'var ' + varname + ' = ' + content,
    function( error ) { console.log( 'File is written successfully!' ) } );
}

app.get('/lyricsone', function(req, res) {

  var url = "https://www.azlyrics.com/lyrics/toohort/invasionoftheflatbootybitches.html";

  // let's make the http request to the url above using the 'request' dependency
  request(url, function(error, response, html) {

    // only execute if there's no error
    if( !error ){

      // we can use the dependency 'cheerio' to traverse the DOM and use jQuery-like selectors and functions
      var $ = cheerio.load(html);

      // let's create a javascript object to save our data in
      var lyrics_list= [];

      // all the content we are looking for are inside a div with the id 'content', let's filter so that the data we are working with is without unnecessary data
      $( '.row' ).filter( function( ) {
          $(this).find('div').each(function(i, elem){
            var text = $( this ).text( );
            text = text.replace( /(\r\n|\n\r|\r|\n|\t)/gm, ' ' );
            text = text.replace( /(  )/gm, ' ' )
            text = text.trim( );

            if ( text != '' ) lyrics_list.push( text );
          } );
      } );
      // ## END HERE

      // send the data we've stored in our object back to the browser
      res.send( lyrics_list );

      // ## COPY THIS AS WELL (BECAUSE OF THE STRINGIFY)
      fs.writeFile( './azlyrics_one.js',
          'var azlyrics_one = ' + JSON.stringify( lyrics_list, null, 2 ) + ';',
          function( error ) { console.log( 'File is written successfully!' ) } );

    }
  });
});

app.get('/lyricstwo', function(req, res) {

  var url = "https://www.azlyrics.com/lyrics/tpain/bootytmix.html";

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

      fs.writeFile('./azlyrics_two.js',
        'var azlyrics_two = ' + lyrics_list,
        function( error ) { console.log( 'File is written successfully!' ) } );
    }
  });
});

app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;
