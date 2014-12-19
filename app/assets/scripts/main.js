'use strict';

// Initialize Phaser, and create a 800x600px game
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');


// Create our 'main' state that will contain the game
var mainState = {

  /**
   * This function will be executed at the beginning
   * That's where we load the game's assets
   * @type {Function}
   */
  preload: function() {
    game.load.image('starfield', '/assets/images/starfield.png');
    game.load.image('player',    '/assets/images/player.png');
  },


  /**
   * This function is called after the preload function
   * Here we set up the game, display sprites, etc.
   * @type {Function}
   */
  create: function() {
    // The scrolling starfield background
    this.starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    // Da playa!
    this.player = game.add.sprite(400, 500, 'player');
    this.player.anchor.setTo(0.5, 0.5);

    game.physics.enable(this.player, Phaser.Physics.ARCADE);

    // Add some controls to play the game with
    this.cursors = game.input.keyboard.createCursorKeys();
  },


  /**
   * This function is called 60 times per second
   * It contains the game's logic
   * @type {Function}
   */
  update: function() {
    // Increase velocity if SHIFT is down
    var defaultVelocity = game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) ? 800 : 200;

    // Scroll the background
    this.starfield.tilePosition.y += 2;

    // Reset the game, then check for movement keys
    this.player.body.velocity.setTo(0, 0);

    if(this.cursors.left.isDown) {
      this.player.body.velocity.x = -1 * defaultVelocity;
    } else if(this.cursors.right.isDown) {
      this.player.body.velocity.x = defaultVelocity;
    }

    if(this.cursors.up.isDown) {
      this.player.body.velocity.y = -1 * defaultVelocity;
    } else if(this.cursors.down.isDown) {
      this.player.body.velocity.y = defaultVelocity;
    }
  }

};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');