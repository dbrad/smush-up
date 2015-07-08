(function() {
  angular.module('smushUp').controller("DeckPickerController", function($rootScope, SmashUp, Errors) {
    var self = this;
    this.sets = {};
    var selectedFactions = [];
    this.player_one = [];
    this.player_two = [];

    this.startSelection = function() {
      this.getSelectedFactions();
      if(selectedFactions.length < 4) {
        this.setStage(0);
        Errors.add("Need at least 4 factions.");
        return;
      }
      this.player_one = [];
      this.player_two = [];
      this.pickDeck(this.player_one);
      this.pickDeck(this.player_two);
      this.pickDeck(this.player_one);
      this.pickDeck(this.player_two);
    };

    this.pickDeck = function(player) {
      var fac = _.sample(selectedFactions);
      player.push(fac);
      selectedFactions = _.reject(selectedFactions, function(f) { return f.name == fac.name; });
    };

    this.updateSets = function() {
      self.sets = SmashUp.data;
      self.getSelectedFactions();
    };
    SmashUp.regObv(this.updateSets);
    this.getStage = function() {
      return $rootScope.Stage;
    };
    this.setStage = function( value ) {
      $rootScope.Stage = value;
    };

    this.getSelectedFactions = function() {
      selectedFactions = _.chain(self.sets)
        .where({"selected":true})
        .pluck("factions")
        .flatten()
        .where({"selected": true})
        .value();

      return selectedFactions;
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
