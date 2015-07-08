(function() {
  angular.module("smushUp").controller("SetController", ["$rootScope", "SmashUp", SetController]);

  function SetController($rootScope, SmashUp) {
    if(!$rootScope.Stage)
      $rootScope.Stage = 0;

    var self = this;
    this.sets = {};
    this.showDecks = false;

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

    this.parentCheck = function( _set ) {
      for( var f in _set.factions ) {
        var faction = _set.factions[f];
        faction.selected = _set.selected;
      }
    };

    this.childCheck = function( _set, _faction ) {
      if( _faction.selected )
        _set.selected = true;
      else {
        var anyCheck = false;
        for( var f in _set.factions ) {
          var faction = _set.factions[f];
          anyCheck = anyCheck || faction.selected;
        }
        if(!anyCheck)
          _set.selected = false;
      }
    };

    this.checkAll = function() {
      for( var s in self.sets ) {
        var set = self.sets[s];
        set.selected = true;
        for( var f in set.factions ) {
          var faction = set.factions[f];
          faction.selected = true;
        }
      }
    };

    this.uncheckAll = function() {
      for( var s in self.sets ) {
        var set = self.sets[s];
        set.selected = false;
        for( var f in set.factions ) {
          var faction = set.factions[f];
          faction.selected = false;
        }
      }
    };

    this.toggleShowDecks = function() {
      self.showDecks = !self.showDecks;
    };

    this.setPickStage = function() {
      return (self.getStage() === 0);
    };

    this.moveToDeck = function() {
      self.setStage(1);
      SmashUp.data = self.sets;
      SmashUp.notify();
    };
  }
})();
