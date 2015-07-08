(function() {
  angular.module("smushUp", []);

  angular.module('smushUp').factory('SmashUp', function($http, $q) {
    var SmashUp = {};

    SmashUp.obv = [];
    SmashUp.data = {};
    SmashUp.regObv = function(callback) {
      SmashUp.obv.push(callback);
    };
    SmashUp.notify = function() {
      for( var o in SmashUp.obv ) {
        SmashUp.obv[o]();
      }
    };

    $http.get('/factions.json').success( function (data) {
      SmashUp.data = data;
      SmashUp.notify();
    });

    return SmashUp;
  });

  angular.module('smushUp').factory('Errors', function() {
    var Errors = {};
    Errors.msgs = [];

    Errors.clear = function() {
      Errors.msgs = [];
    };
    Errors.add = function(value) {
      Errors.msgs.push(value);
    };

    return Errors;
  });

  angular.module('smushUp').controller("ErrorController", function(Errors) {
    this.getAllErrors = function() {
      return Errors.msgs;
    };
  });

})();
