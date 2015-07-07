(function() {
  angular.module("smushUp", []);

  angular.module('smushUp').factory('SmashUp', function($http, $q) {
    var deffered = $q.defer();
    $http.get('/factions.json').success( function (data) {
      deffered.resolve(data);
    });
    return deffered.promise;
  });
})();
