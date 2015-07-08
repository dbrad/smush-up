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

  angular.module('smushUp').controller("DeckPickerController", function($rootScope, SmashUp) {
    var self = this;
    this.sets = {};

    this.updateSets = function() {
      self.sets = SmashUp.data;
    };
    SmashUp.regObv(this.updateSets);
    this.getStage = function() {
      return $rootScope.Stage;
    };
    this.setStage = function( value ) {
      $rootScope.Stage = value;
    };

    this.getSelectedCount = function() {
      return _.countBy(self.sets, function(set) {
        return (set.selected ? "Sel" : "NotSel");
      });
    };

    this.deckPickStage = function() {
      return self.getStage() === 1;
    };
  });
})();
