require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var selector = process.argv[2];
var user = process.argv[3];
var amount = parseFloat(process.argv[4]);

// var test = [];

// test.push(selector, user, amount);
// console.log(test);

switch (selector) {
  case ("twit"):
    if (user && amount) {
      console.log(user);
      userSearch();
    } else {
      console.log("please be sure to include a @Name to search and an amount of data to be pulled!");
    }
    break;

  case ("spot"):
    console.log("in");
    spotifySearch();
    break;

}

//twitter search function
function userSearch() {
  var parameters = {
    screen_name: user,
    count: amount
  }

  client.get("statuses/user_timeline", parameters, function (err, tweets) {
    if (err) {
      console.log(err);
      throw err;
    }

    for (var i = 0; i < tweets.length; i++) {
      var newestPost = tweets[i].text;
      console.log(newestPost);
    }
  });
}

// data.tracks.items.length
// spotify

function spotifySearch() {
  spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    for (var i = 0; i < data.tracks.items.length; i++) {
      var newestPost = data.tracks.items.name;
      console.log(data.tracks.items[i].album.external_urls.spotify);
      console.log(newestPost);
    }
  });
}
