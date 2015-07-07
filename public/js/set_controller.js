(function() {
  angular.module("smushUp").controller("SetController", SetController);

  function SetController(SmashUp) {
      var self = this;
      this.sets = {};
      this.showDecks = false;
      var lockedIn = false;

      SmashUp.then(function(data) {
        self.sets = data;
      });

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

      this.lockedIn = function() {
        return lockedIn;
      };

      this.lockIn = function() {
        lockedIn = true;
      };

}
})();
