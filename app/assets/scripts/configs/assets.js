/**
 * Load game assets
 */
Module('Shooter.Assets', function(Assets) {

  Assets.fn.preload = function() {
    GAME.load.image('starfield',   '/assets/images/starfield.png');
    GAME.load.image('ship',        '/assets/images/ship.png');
    GAME.load.image('bullet',      '/assets/images/bullet.png');
    GAME.load.image('enemy-green', '/assets/images/enemy-green.png');

    GAME.load.spritesheet('explosion', '/assets/images/explode.png', 128, 128);
  };

  Shooter.Application.addToPreload(Assets.fn.preload.bind(Assets.fn));
});