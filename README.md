# Twitcher

>The term 'twitcher', sometimes misapplied as a synonym for birder, is reserved for those who travel long distances to see a rare bird that would then be "ticked", or checked off, on a list. (...) The main goal of twitching is often to accumulate species on one's lists. Some birders engage in competition to accumulate the longest species list. The act of the pursuit itself is referred to as a "twitch" or a "chase". A rare bird that stays put long enough for people to see it is "twitchable" or "chaseable".

_http://en.wikipedia.org/wiki/Birdwatching#Birding.2C_birdwatching_and_twitching_

Twitcher is a _tiny_ JavaScript library for consuming the Twitter Search API.

...but _really_ it is just some Twitter specific stuff on top of a simple [JSONP](http://bob.pythonmac.org/archives/2005/12/05/remote-json-jsonp/) interface.

## Here is how it works

	var tooter = Twitcher('from:markwunsch');
	tooter.load(function(response){
		alert('Alright I'm finished loading Tweets from the Twitter Search API!');
	});
	
then you can do stuff like this:

	tooter.complete
	
will be true if `tooter.load()` has completed

	tooter.successful
	
will be true if `tooter.load()` has responded successfully

	tooter.response
	
will contain the full response

	tooter.tweets()
	
will return all the tweets in the search results. you can loop over them like this:

	tooter.tweets(function(tweet){
		tweet.from_user 
		// that's who wrote the tweet
		
		tweet.profile_image_url 
		// that's their little avatar
		
		tweet.source 
		// that's a link to the program they used to write their tweet
		
		tweet.id 
		// that's the tweet id
		
		tweet.text 
		// that's the tweet
	});
	
You can do the same thing this way: `tooter.each_tweets`

## That's it

You just get a nice interface to the [Twitter Search API](http://apiwiki.twitter.com/Twitter-Search-API-Method%3A-search). 

It doesn't do anything else.

Thanks.