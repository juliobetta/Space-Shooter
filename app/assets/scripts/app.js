Module('Shooter.Application', function(Application) {
  'use strict';

  var initialized = false,
      preload     = [],
      create      = [],
      update      = [];

  /**
   * Add function to preload array
   * @param {Function} fn
   */
  Application.addToPreload = function(fn) {
    preload.push(fn);
  };


  /**
   * Add function to create array
   * @param {Function} fn
   */
  Application.addToCreate = function(fn) {
    create.push(fn);
  };


  /**
   * Add function to update array
   * @param {Function} fn
   */
  Application.addToUpdate = function(fn) {
    update.push(fn);
  };


  /**
   * Run all functions inside initializers array
   * @return {void}
   */
  Application.run = function(attrs) {
    if(initialized) return;

    var mainState, key, value;

    // add properties passed as parameter
    for(key in attrs) {
      value = attrs[key];
      this[key] = value;
    }

    // Initialize Phaser
    GAME = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '');

    // Create game main state
    mainState = {
      preload: function() {
        preload.forEach(function(fn){
          fn();
        });
      },

      create: function() {
        create.forEach(function(fn){
          fn();
        });
      },

      update: function() {
        update.forEach(function(fn){
          fn();
        });
      }
    };

    // Add and start the 'main' state to start the game
    GAME.state.add('main', mainState);
    GAME.state.start('main');
  };
});