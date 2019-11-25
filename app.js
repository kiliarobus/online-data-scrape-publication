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


// ## GENERIC FUNCTIONS TO KEEP YOUR CODE CLEAN (WITHOUT REDUNDANCY) ######## //

let write_output = function( destination, varname, content ) {
  fs.writeFile( destination, 'var ' + varname + ' = ' + content,
    function( error ) { console.log( 'File is written successfully!' ) } );
}
let cleanup_text = function( text ) {
  text = text.replace( /(\r\n|\n\r|\r|\n|\t)/gm, ' ' );
  text = text.replace( /(  )/gm, ' ' );

  return text.trim( );
}


// ## LYRICS ################################################################ //

app.get('/lyrics', function(req, res) {
  var url = "https://www.azlyrics.com/lyrics/guccimane/bigbooty.html";

  // let's make the http request to the url above using the 'request' dependency
  request(url, function(error, response, html) {

    // only execute if there's no error
    if( !error ){

      // we can use the dependency 'cheerio' to traverse the DOM and use jQuery-like selectors and functions
      var $ = cheerio.load(html);

      // let's create a javascript object to save our data in
      var lyrics_list= [ ];

      // all the content we are looking for are inside a div with the id 'content',
      // let's filter so that the data we are working with is without unnecessary data
      $( '.col-xs-12.col-lg-8.text-center' ).filter( function( ) {
          $( this ).find( 'div' ).each( function( i, elem ) {
              var text = cleanup_text( $( this ).text( ) );
              if ( text != '' ) lyrics_list.push( text );
          } );
      } );

      // send the data we've stored in our object back to the browser
      res.send( lyrics_list );

      write_output( './Data/00.js', 'azlyrics', JSON.stringify( lyrics_list, null, 2 ) );
    }
  });
});


// ## LYRICS ONE ############################################################ //

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
            var text = cleanup_text( $( this ).text( ) );
            if ( text != '' ) lyrics_list.push( text );
          } );
      } );

      // send the data we've stored in our object back to the browser
      res.send( lyrics_list );

      write_output( './Data/01.js', 'azlyrics_one', JSON.stringify( lyrics_list, null, 2 ) );
    }
  });
});


// ## LYRICS TWO ############################################################ //

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
            var text = cleanup_text( $( this ).text( ) );
            if ( text != '' ) lyrics_list.push( text );
          });
      });

      // send the data we've stored in our object back to the browser
      res.send( lyrics_list );

      write_output( './Data/02.js', 'azlyrics_two', JSON.stringify( lyrics_list, null, 2 ) );
    }
  });
});


// ## LYRICS THREE ########################################################## //

app.get('/lyricsthree', function(req, res) {
  var url = "https://www.azlyrics.com/lyrics/brokencyde/bootycall.html";

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
            var text = cleanup_text( $( this ).text( ) );
            if ( text != '' ) lyrics_list.push( text );
          });
      });

      // send the data we've stored in our object back to the browser
      res.send(lyrics_list);

      write_output( './Data/03.js', 'azlyrics_three', JSON.stringify( lyrics_list, null, 2 ) );
    }
  });
});

// ## LYRICS FOUR ########################################################## //

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
            var text = cleanup_text( $( this ).text( ) );
            if ( text != '' ) lyrics_list.push( text );
          });
      });

      // send the data we've stored in our object back to the browser
      res.send(lyrics_list);

      write_output( './Data/04.js', 'azlyrics_four', JSON.stringify( lyrics_list, null, 2 ) );
    }
  });
});


// ## LYRICS FIVE ########################################################## //

app.get('/lyricsfive', function(req, res) {
  var url = "https://www.azlyrics.com/lyrics/kstylis/trampolinebooty.html";

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
            var text = cleanup_text( $( this ).text( ) );
            if ( text != '' ) lyrics_list.push( text );
          });
      });

      // send the data we've stored in our object back to the browser
      res.send(lyrics_list);

      write_output( './Data/05.js', 'azlyrics_five', JSON.stringify( lyrics_list, null, 2 ) );
    }
  });
});

// ## LYRICS SIX ########################################################## //

app.get('/lyricssix', function(req, res) {
  var url = "https://www.azlyrics.com/lyrics/funkadelic/loosebooty.html";

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
            var text = cleanup_text( $( this ).text( ) );
            if ( text != '' ) lyrics_list.push( text );
          });
      });

      // send the data we've stored in our object back to the browser
      res.send(lyrics_list);

      write_output( './Data/06.js', 'azlyrics_six', JSON.stringify( lyrics_list, null, 2 ) );
    }
  });
});

// ## LYRICS SEVEN ########################################################## //

app.get('/lyricsseven', function(req, res) {
  var url = "https://www.azlyrics.com/lyrics/karlwolf/bootyful.html";

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
            var text = cleanup_text( $( this ).text( ) );
            if ( text != '' ) lyrics_list.push( text );
          });
      });

      // send the data we've stored in our object back to the browser
      res.send(lyrics_list);

      write_output( './Data/07.js', 'azlyrics_seven', JSON.stringify( lyrics_list, null, 2 ) );
    }
  });
});

// ## LYRICS EIGHT ########################################################## //

app.get('/lyricseight', function(req, res) {
  var url = "https://www.azlyrics.com/lyrics/dungeonfamily/crookedbooty.html";

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
            var text = cleanup_text( $( this ).text( ) );
            if ( text != '' ) lyrics_list.push( text );
          });
      });

      // send the data we've stored in our object back to the browser
      res.send(lyrics_list);

      write_output( './Data/08.js', 'azlyrics_eight', JSON.stringify( lyrics_list, null, 2 ) );
    }
  });
});

// ## LYRICS NINE ########################################################## //

app.get('/lyricsnine', function(req, res) {
  var url = "https://www.azlyrics.com/lyrics/jonnhart/whobootyremix.html";

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
            var text = cleanup_text( $( this ).text( ) );
            if ( text != '' ) lyrics_list.push( text );
          });
      });

      // send the data we've stored in our object back to the browser
      res.send(lyrics_list);

      write_output( './Data/09.js', 'azlyrics_nine', JSON.stringify( lyrics_list, null, 2 ) );
    }
  });
});

// ## LYRICS TEN ########################################################## //

app.get('/lyricsten', function(req, res) {
  var url = "https://www.azlyrics.com/lyrics/jonnhart/whobootyremix.html";

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
            var text = cleanup_text( $( this ).text( ) );
            if ( text != '' ) lyrics_list.push( text );
          });
      });

      // send the data we've stored in our object back to the browser
      res.send(lyrics_list);

      write_output( './Data/10.js', 'azlyrics_ten', JSON.stringify( lyrics_list, null, 2 ) );
    }
  });
});







app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;
