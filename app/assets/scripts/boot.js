Module('Shooter.Boot', function(Boot) {
  'use strict';

  Boot.initialize = function() {
    // Initialize Phaser
    GAME = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '');

    Shooter.States.Preloader.fn.run();
  };

});