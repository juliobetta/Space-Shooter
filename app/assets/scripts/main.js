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
    game.load.image('startfield', '/assets/images/starfield.png');
    game.load.image('player',     '/assets/images/player.png');
  },


  /**
   * This function is called after the preload function
   * Here we set up the game, display sprites, etc.
   * @type {Function}
   */
  create: function() {
    // The scrolling starfield background
    this.startfield = game.add.tileSprite(0, 0, 800, 600, 'startfield');

    // Da playa!
    this.player = game.add.sprite(400, 500, 'player');
    this.player.anchor.setTo(0.5, 0.5);
  },


  /**
   * This function is called 60 times per second
   * It contains the game's logic
   * @type {Function}
   */
  update: function() {
  }

};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');