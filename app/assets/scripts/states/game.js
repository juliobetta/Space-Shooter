Module('Shooter.States.Game', function(Game) {
  'use strict';

  Shooter.extend(Game.fn, Shooter.States.Base.fn);

  /**
   * Initialize
   */
  Game.fn.initialize = function() {
    this.super.initialize();
    this.stateName = 'game';
  };

  Game.fn.initialize();
});