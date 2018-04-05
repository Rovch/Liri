require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var inquirer = require('inquirer');
var request = require("request");
const opn = require('opn');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

inquirer.prompt({
  type: "list",
  name: "theme",
  name: "platform",
  message: "Choose a platform to search!",
  choices: [
    "Twitter",
    "Spotify",
    "Movie"
  ]
}).then(function (answer) {
  switch (answer.platform) {
    case ("Twitter"):
      twitterSearch();
      break;

    case ("Spotify"):
      spotifySearch();
      break;

    case ("Movie"):
      movie();
      break;
  }
});

//twitter search function
function twitterSearch() {
  var questions = [{
    type: "input",
    name: "user",
    message: "Please enter an account to search!",
  },
  {
    type: "input",
    name: "amount",
    message: "How many tweets would you like to return?",
  }
  ];

  inquirer.prompt(questions).then(function (answer) {
    var parameters = {
      screen_name: answer.user,
      count: answer.amount
    }
    if (answer.user && answer.amount) {
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
  });
}

var temp = [];

function spotifySearch() {
  var questions = [{
    type: "input",
    name: "track",
    message: "Please enter a track to search!",
  }
  ];

  inquirer.prompt(questions).then(function (answer) {
    var search = {
      type: 'track',
      query: answer.track,
      limit: 5
    }

    spotify.search(search, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      for (var i = 0; i < data.tracks.items.length; i++) {
        // var spotSearch = data.tracks.items[i].name;
        var secSearch = data.tracks.items[i].album.external_urls.spotify;
        temp.push(secSearch);
        // console.log(spotSearch);
        // console.log(secSearch);
      }
      test();
    })
  });
}

function test() {
  inquirer.prompt({
    message: "What track would like to open up?",
    type: "list",
    name: "links",
    choices: temp
  }).then(function(answer){
    opn(answer.links);
  })
};

function movie() {
  var questions = ([
    {
      type: 'input',
      message: 'Search for movie name:',
      name: 'movieS'
    },
  ]);

  inquirer.prompt(questions).then(function (answer) {
    request("http://www.omdbapi.com/?t=" + answer.movieS + "&apikey=trilogy", function (err, response, body) {
      if (!err && response.statusCode === 200) {

        console.log(`
     Title:  ${JSON.parse(body).Title}
     Release:  ${JSON.parse(body).Year}
     IMDB Rating:  ${JSON.parse(body).Rated}
     Rotten Tomatoes Rating:  ${JSON.parse(body).Value}
     Country where the movie was produced:  ${JSON.parse(body).Country}
    `)
      }
    });
  });
};