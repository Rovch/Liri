require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(spotify);

var newInput = process.argv[2];
var user = process.argv[3];


if (newInput === "twit" && user) {
  console.log(user);
  userSearch();
} else if (newInput === "twit" && !user) {
  console.log("please be sure to include a @Name to search!");
}

if (newInput == "spot") {
  spotifySearch();
}


//twitter search function
function userSearch() {
  var parameters = {
    screen_name: user,
    count: 20
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


//spotify


function spotifySearch() {
  spotify.POST ("https://accounts.spotify.com/api/token")

  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
}
