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
    },
    
    extend: function(target, object) {
      for (var i in object) {
        target[i] = object[i];
      }
    }
  };
  
  Twitcher.prototype = { 
    init: function(query, params) {
      var self = this;
      
      self.setup.query_string = query || "";
      self.url = self.compose_url();
      if (query) {
        self.load(function(data){
          console.log(data);
        });
      }
            
      return self;
    },
    
    compose_url: function(query){
      query = query || this.setup.query_string
      return Twitcher.URL() + "?" + "q=" + encodeURIComponent(query);
    },
    
    setup: {
      query_string: "",
      parameters: {
        "lang": "",
        "locale": "",
        "rpp": "",
        "page": "",
        "since_id": "",
        "geocode": "",
        "show_user": ""
      },
      
      callback: "twitcher_load",
    },
    
    successful: false,
    
    complete: false,
    
    response: null,
    
    tweets: function(lambda) {
      if (this.response) {
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
      } else {
        return null;
      }      
    },
    
    count: function(){
      var tweets = this.tweets();
      if (tweets) {
        return this.tweets().length;  
      } else {
        return null;
      }
    },
    
    each_tweet: function(lambda){
      this.tweets(lambda);
    },
    
    load: function(lambda) {
      var ext = Twitcher.Extensions;
      var caller = this;
      var nonce = Date.now();
      var url = caller.url;
      var callback = caller.setup.callback + "_" + nonce;
      
      var func = function(data) {
        if (lambda) {
         lambda(data); 
        }
        caller.response = data;
        caller.complete = true;
        if (!data.error) {
          caller.successful = true;
        }
      };
      
      url += "&callback=" + callback;
      ext.jsonp(url, func, callback);
    }  
  };
  
  window.Twitcher = function(query, parameters) {
    return new Twitcher(query,parameters);
  };
  Twitcher.Extensions.extend(window.Twitcher, Twitcher);
  
})();
