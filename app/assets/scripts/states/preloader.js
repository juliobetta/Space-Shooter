Module('Shooter.States.Preloader', function(Preloader) {
  'use strict';

  Shooter.extend(Preloader.fn, Shooter.States.Base.fn);

  /**
   * Initialize
   */
  Preloader.fn.initialize = function() {
    this.super.initialize();
    this.stateName = 'preloader';

    this.addToPreload(this.preload.bind(this));
    this.addToCreate(this.create.bind(this));
  };


  /**
   * ########################################################################################
   * State Methods ##########################################################################
   * ########################################################################################
  */

  Preloader.fn.create = function() {
    // Start game state
    Shooter.States.Game.fn.run();
  };


  Preloader.fn.preload = function() {
    GAME.load.image('starfield',         '/assets/images/starfield.png');
    GAME.load.image('ship',              '/assets/images/ship.png');
    GAME.load.image('bullet',            '/assets/images/bullet.png');
    GAME.load.image('enemy-green',       '/assets/images/enemy-green.png');
    GAME.load.image('enemy-blue',        '/assets/images/enemy-blue.png');
    GAME.load.image('enemy-blue-bullet', '/assets/images/enemy-blue-bullet.png');

    GAME.load.spritesheet('explosion', '/assets/images/explode.png', 128, 128);
  };

  /**
   * ########################################################################################
   * ########################################################################################
  */


  Preloader.fn.initialize();
});