Module('Shooter.Game.Starfield', function(Starfield) {
  'use strict';

  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Starfield.fn.create = function() {
    this.starfield = GAME.add.tileSprite(0, 0, 800, 600, 'starfield');
  };


  Starfield.fn.update = function() {
    // Scroll the background
    this.starfield.tilePosition.y += 2;
  };

  // ########################################################################################
  // ########################################################################################


  Shooter.States.Game.fn.addToCreate(Starfield.fn.create.bind(Starfield.fn));
  Shooter.States.Game.fn.addToUpdate(Starfield.fn.update.bind(Starfield.fn));
});