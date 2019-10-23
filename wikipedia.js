

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
      var lyrics_list = []; {
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

app.get('/wikihow', function(){
  var keywords = ["love", "cry", "hug"];
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
