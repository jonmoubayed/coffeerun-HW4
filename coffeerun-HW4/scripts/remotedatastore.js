(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied');
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + '/' + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    console.log(key);
    $.ajax({
      url: 'http://localhost:2403/coffeeorders?emailAddress=' + key,
      type: 'GET',
      success: function(result) {
        console.log(result);
        console.log(result[0].id);
        $.ajax({
          url: 'http://localhost:2403/coffeeorders?id=' + result[0].id,
          type: 'DELETE',
          success: function(result) {
            console.log("key" + ' deleted');
          }
        });
      }
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
