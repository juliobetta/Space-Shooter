'use strict';

// Initialize Phaser, and create a 800x600px game
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

var ACCELERATION = 600,
    MAXSPEED     = 400,
    DRAG         = 400;

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

    this.player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    this.player.body.drag.setTo(DRAG, DRAG);

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
    var defaultAcceleration = game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)
      ? ACCELERATION * 3 : ACCELERATION;

    // Scroll the background
    this.starfield.tilePosition.y += 2;

    // Reset the game, then check for movement keys
    this.player.body.acceleration.x = 0;
    this.player.body.acceleration.y = 0;

    if(this.cursors.left.isDown) {
      this.player.body.acceleration.x = -defaultAcceleration;
    } else if(this.cursors.right.isDown) {
      this.player.body.acceleration.x = defaultAcceleration;
    }

    if(this.cursors.up.isDown) {
      this.player.body.acceleration.y = -defaultAcceleration;
    } else if(this.cursors.down.isDown) {
      this.player.body.acceleration.y = defaultAcceleration;
    }
  }

};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');