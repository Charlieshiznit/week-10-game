#!/bin/bash
 var keys=require('./keys');
 var spotify=require('spotify');
 var Twitter=require('twitter');
 var request=require('request');
 var events = require('events');
 var util = require('util');
 var fs = require('fs');

 var writeToLog = function(data){
 	fs.appendFile('log.txt'. JSON.stringify(data), function(err){
 		if(err) {
 			return console.log(err);
 		}
 		console.log('log.txt was updated!');
 	})
 }
 
 var getArtistNames = function(artist){
 	return artist.name;
 }

 var getMeSpotify = function(songName){

 	if (songName === undefined){
 		 (songName)= 'What\'s my age again';

 	}

 		spotify.search({type: "track", query:songName }, function(err,data) {
 			if (err) {
 				console.log('Error occured:' + err);
 				return;
 			}

 			//debugger below so I can what's inside the dat in the node console.
 		var songs = data.tracks.items;

 		for(var i = 0; i < songs.length; i++){
 				console.log(i);
 				console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
 				console.log('song name: ' + songs[i].name);
 				console.log('preview song: ' + songs[i].preview_url);
 				
 				console.log('------------------------------------');
 			}

 		});

}

var getMyTweets = function(){

		var client = new Twitter(keys.twitterKeys);

		var params ={ screen_name: 'inrtracker'};
		client.get('statuses/user_timeline', params, function(error, tweets, response){
			if (!error) {

			//console logging these tweets
			//debugger; // used to find out what's inside tweets in node
			for (var i=0; i < tweets.length; i++){
				console.log(tweets[i].created_at);
				console.log('');
				console.log(tweets[i].text);
			}
		}
	});

}

var getMeMovie = function(movieName){

	if (movieName === undefined){
		movieName = 'Mr Nobody';
	}


	var urlHit = 'http:www.omdapi.com/?t=' + movieName + '&y=&plot=full&tomatoes=true&r=json';

	request(urlHit,function (error,response, body) {
		if (!error && resonse.statusCode == 200) {
			var jsonData = JSON.parse(body);

			console.log('Title: '+ jsonData.Title);
			console.log('Year: ' + jsonData.Year);
			console.log('Rated: ' + jsonDate.Rated);
			console.log('IMDB Rating: ' + jsonData.imdbRating);
			console.log('Country: ' + jsonData.Country);
			console.log('Language: '+ jsonData.Language);
			console.log('Plot: ' + jsonData.Plot);
			console.log('Actors: ' + jsonData.Actors);
				console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
			console.log("Rotten Tomatoes URL: " + jsonData.tomatoURL);
			}
	});

}

var doWhatItSays = function(){
	fs.readFile('random.txt', 'utf8', function(error,data){
		console.log(data);

		var dataArr = data.split(',')

		if (dataArr.length == 2){
				pick(dataArr[0], dataArr[1]);
			}else if (dataArr.length == 1){
				pick(dataArr[0]);
			}
		
	});
}

var pick = function(caseData, functionData){
	switch(caseData){
		case 'my-tweets':
			getMyTweets();
			break;
		case 'spotify-this-song':
			getMeSpotify();
			break;
		case 'movie-this':
			getMeMovie();
			break;
		case 'doWhatItSays':
			doWhatItSays();
			break;
		default:
			console.log ('LIRI doesn\'t know that');	
	}
}

// Run this on load of js file
var runThis = function (argONE, argTWO) {
	pick(argONE,argTWO);
};

runThis(process.argv[2],process.argv[3]);