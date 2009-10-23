/**
 * Twitcher v0.0.1
 *
 * Copyright (c) 2009 Mark Wunsch
 * Licensed under the MIT License.
 * http://creativecommons.org/licenses/MIT/
**/

(function(){
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
      
      self.query_string = query || "";
      self.parameters = self.build_params(params);
      self.url = self.compose_url();
      
      return self;
    },
    
    build_params: function(params){
      var setup = this.parameters;
      var new_params = {};
      
      if (!params) {
        return new_params;
      }
      
      for (var key in params) {        
        if (setup[key]) {
          new_params[key] = params[key] + '';
        }
      }
      
      return new_params;
    },
    
    compose_url: function(query, params){
      query = query || this.query_string;
      params = params || this.parameters;
      var param_string = "q=" + encodeURIComponent(query);
      
      for (var key in params) {
        param_string += "&" + key + "=" + encodeURIComponent(params[key]);
      }
      
      return Twitcher.URL() + "?" + param_string;
    },    
    
    query_string: "",
    
    parameters: {
      "lang": true,
      "locale": true,
      "rpp": true,
      "page": true,
      "since_id": true,
      "geocode": true,
      "show_user": true
    },
    
    callback: "twitcher_load",
    
    successful: false,
    
    complete: false,
    
    response: null,
    
    loading: false,
    
    tweets: function(lambda) {
      if (this.response) {
        var tweets = this.response.results;
        if (tweets) {
          if (!lambda) {
            return tweets;
          } else {
            for (var i=0; i < tweets.length; i += 1) {
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
      var callback = caller.callback + "_" + nonce;
      caller.loading = true;
      
      var func = function(data) {
        caller.loading = false;
        caller.response = data;
        caller.complete = true;
        if (!data.error) {
          caller.successful = true;
        }
        
        if (lambda) {
         lambda(data); 
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
