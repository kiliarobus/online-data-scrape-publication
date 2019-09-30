var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var port = 2100;
var app = express();

// WIKIPEDIA SCRAPER: access by going to 'localhost:2100/wikipedia'
app.get('/wikipedia', function(req, res) {

  var url = "https://en.wikipedia.org/wiki/Barcelona";

  // let's make the http request to the url above using the 'request' dependency
  request(url, function(error, response, html) {

    // only execute if there's no error
    if( !error ){

      // we can use the dependency 'cheerio' to traverse the DOM and use jQuery-like selectors and functions
      var $ = cheerio.load(html);

      // let's create a javascript object to save our data in
      var wiki_data = {
        title: '',
        img: '',
        paragraph: ''
      };

      // all the content we are looking for are inside a div with the id 'content', let's filter so that the data we are working with is without unnecessary data
      $('#content').filter(function(){

        // we can access the properties of our javascript object by writing the name of the object 'dot' and then the name of the property
        wiki_data.title = $(this).find('h1').text();
        wiki_data.img = $(this).find('img').attr('src');
        wiki_data.paragraph = $(this).find('p').first().text();

      });

      // send the data we've stored in our object back to the browser
      res.send(wiki_data);

      fs.writeFile('./data/wiki_output.js', "var wiki_output = " + JSON.stringify(wiki_data), function(error){
        console.log("File is written successfully!");
      });
    }
  });
});

// IMDB SCRAPER: access by going to 'localhost:2100/imdb'
app.get('/imdb', function(req, res){

//storing URL
  var url = 'https://www.imdb.com/chart/top';

//making HTTP request
  request(url, function(error, response, html) {
    if(!error) {
      //res.send(html);
      var $ = cheerio.load(html);
      var data = [];

      $('.lister-list').filter(function(){
      $(this).find('tr').each(function(i, elem){
      data[i] ="'" + $(this).find('.posterColumn').find('img').attr('src') + "'";
    });

  });

      res.send(data);

      fs.writeFile('imdb-output.js','var imdb_list =['+ data +']', function(){
        console.log('File written on hard drive!');
      });

    }
});

// INSTAGRAM SCRAPER: access by going to 'localhost:2100/instagram'
app.get('/instagram', function(req, res){

  // try any hashtags and see the results, make sure to write INSIDE the quotation marks
  var hashtag = 'me';
  var url = 'https://instagram.com/explore/tags/'+ hashtag +'/?__a=1';

  // let's make the http request to the url above using the 'request' dependency
  request(url, function(error, response, html) {

    // only execute if there's no error
    if(!error) {

      // we can use the dependency 'cheerio' to traverse the DOM and use jQuery-like selectors and functions
      var $ = cheerio.load(html);

      // the url actually gives back already a ready to use JSON object so we just want that raw text
      var instagram_data = $.text();

      // send the data we've stored in our array back to the browser
      res.send(instagram_data);

      // save the data we've stored in our object on our machine
      fs.writeFile('./data/instagram_output.js', 'var instagram_output = ' + instagram_data, function(err){
        console.log('File is written successfully!');
      });

    }
  });
});

app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;
