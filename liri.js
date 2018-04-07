var env = require("dotenv").config();

//Look at the Spotify & Twitter Docs to see how to do this
const Spotify = require("node-spotify-api"); // This imports the key
const Twitter = require("twitter");  // This imports the key

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var fs = require("fs");
var request = require("request"); 

//var queryUrl = "";



var nodeArgs = process.argv;
var action = nodeArgs[2];
//console.log(nodeArgs[2]);
//console.log(nodeArgs.length);

var movieName = "";

switch(action) {
    case "movie-this":
    movieThis();
    break;

    case "spotify-this-song":
    spotifyThis();
    break;

    case "my-tweets":
    myTweets();
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;
}


function movieThis() {
    //console.log("In movieThis function");
    if (nodeArgs.length < 4) {
        movieName = "Mr.+Nobody";
        //console.log(movieName);
    }
    else {
        for(var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i]; //Start adding the plus sign after the first word in the title
               //console.log(movieName);
            }
            else {
                movieName = movieName + nodeArgs[i]; 
                //console.log(movieName);
            }
        }
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";
    //console.log(queryURL);

    request(queryURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        console.log("The rotten tomatoes rating: " + JSON.parse(body).tomatoRating);
        console.log("The country where the movie was filmed: " + JSON.parse(body).Country);
        console.log("The language: " + JSON.parse(body).Language);
        console.log("The plot: " + JSON.parse(body).Plot);
        console.log("The actors: " + JSON.parse(body).Actors);
        }
    });
}

 
function spotifyThis() {
	console.log("In spotifyThis function");
    if (nodeArgs.length < 4) {
        spotify.search({type: 'track', query: 'All the Small Things'}, function(err, data) {
        if(err) {
            console.log('Error occurred: '+ err);
        }
        console.log(data);
        });
    };
    spotify.search({type: 'track', query: 'Evergreen'}, function(err, data) {
        if(err) {
            console.log('Error occurred: '+ err);
        }
        console.log(data);
        });
    
}

function myTweets() {
	console.log("In myTweets function");
    /*
	client.post('statuses/update', {status: '456 abc'}, function(error, tweet, response) {
        if(error) {
            console.log(error);
        }
        console.log(tweet);
        //console.log(response);
    });
	 }
    */
    client.get('favorites/list', function(error, source, response) {
        if(error) {
            console.log(error);
        }
        console.log(source);
    });
    }

function doWhatItSays() {
	console.log("In doWhatItSays function");


}

