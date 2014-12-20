Module('Shooter.Starfield', function(Starfield) {
  'use strict';

  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Starfield.fn.preload = function() {
    GAME.load.image('starfield', '/assets/images/starfield.png');
  };


  Starfield.fn.create = function() {
    this.starfield = GAME.add.tileSprite(0, 0, 800, 600, 'starfield');
  };


  Starfield.fn.update = function() {
    // Scroll the background
    this.starfield.tilePosition.y += 2;
  };

  // ########################################################################################
  // ########################################################################################


  Shooter.Application.addToPreload(Starfield.fn.preload.bind(Starfield.fn));
  Shooter.Application.addToCreate(Starfield.fn.create.bind(Starfield.fn));
  Shooter.Application.addToUpdate(Starfield.fn.update.bind(Starfield.fn));
});