/**
 * Twitcher v0.0.1
 *
 * Copyright (c) 2009 Mark Wunsch
 * Licensed under the MIT License.
 * http://creativecommons.org/licenses/MIT/
**/

;(function(){
  var window = this;
  var Twitcher = function(query, parameters) {
    this.init(query, parameters);
  };
  
  Twitcher.VERSION = function(){
    return "0.0.1";
  };
  
  Twitcher.URL = function(){
    return "http://search.twitter.com/search.json";
  };
  
  Twitcher.Extensions = {
    jsonp: function(url, callback, callback_name) {
      var head = document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      
      window[callback_name] = function(data) {
        callback(data);
        window[callback_name] = undefined;
        try{ delete window[callback_name]; } catch(e){}
        head.removeChild(script);
      };

      head.appendChild(script);
    }
  };
  
  Twitcher.prototype = { 
    init: function(query, params) {
      var self = this;
      
      self.setup.query_string = query || "";
      self.url = self.compose_url();
      if (query) {
        self.load();
      }
            
      return self;
    },
    
    compose_url: function(query){
      query = query || this.setup.query_string
      return Twitcher.URL() + "?" + "q=" + query;
    },
    
    setup: {
      query_string: "",
      parameters: {
        "callback": "get_tweets",
        "lang": "",
        "locale": "",
        "rpp": "",
        "page": "",
        "since_id": "",
        "geocode": "",
        "show_user": ""
      },
    },
    
    response: null,
    
    tweets: function(lambda) {
      var tweets = this.response.results;
      if (tweets) {
        if (!lambda) {
          return tweets;
        } else {
          for (i=0; i < tweets.length; i += 1) {
            lambda(tweets[i]);
          }
        }
      } else {
        return null;
      }
    },
    
    count: function(){
      return this.tweets().length;
    },
    
    each_tweet: function(lambda){
      this.tweets(lambda);
    },
    
    load: function(url, callback, lambda) {
      var ext = Twitcher.Extensions;
      var caller = this;
      var nonce = Date.now();
      
      url = url || caller.url;
      callback = (callback || caller.setup.parameters.callback) + "_" + nonce;
      
      var func = function(data) {
        caller.response = data;
      };
      
      lambda = lambda || func;
      
      url += "&callback=" + callback;
      ext.jsonp(url, lambda, callback);
    }  
  };
  
  window.Twitcher = function(query, parameters) {
    return new Twitcher(query,parameters);
  };
  for (var key in Twitcher) {
    window.Twitcher[key] = Twitcher[key];
  };
  
})();
