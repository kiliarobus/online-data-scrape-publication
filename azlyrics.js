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

// WIKIPEDIA SCRAPER: access by going to 'localhost:2100/wikipedia'

app.get('/lyrics', function(req, res) {

  var url = "https://www.azlyrics.com/lyrics/guccimane/bigbooty.html";

  // let's make the http request to the url above using the 'request' dependency
  request(url, function(error, response, html) {

    // only execute if there's no error
    if( !error ){

      // we can use the dependency 'cheerio' to traverse the DOM and use jQuery-like selectors and functions
      var $ = cheerio.load(html);

      // let's create a javascript object to save our data in
    var lyrics_list= [];

      // all the content we are looking for are inside a div with the id 'content', let's filter so that the data we are working with is without unnecessary data
      $('.panel').filter(function(){
          $(this).find('tr').each(function(){
            console.log($(this).text())
          })

      });



      // send the data we've stored in our object back to the browser
      res.send(lyrics_list);

      fs.writeFile('./data/azlyrics_output.js', "var azlyrics_output = " + JSON.stringify(lyrics_list), function(error){
        console.log("File is written successfully!");
      });
    }
  });
});

app.get('/lyrics', function(){
  var keywords = ["booty"];
  var urls = [];

  for(word in keywords) {

    http.get("https://www.wikihow.com/wikiHowTo?search=" + word, function(response) {
      response.on('data', function(chunk){
        var $ = cheerio.load(chunk);

        $('a.result_link').each(function(index, element){
          urls[index] = $(this).attr('href');
        });
      });

    });

    }

  if(urls.length > 0) {
    for(url in urls) {

    }
  }

});
