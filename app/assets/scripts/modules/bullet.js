Module('Shooter.Bullet', function(Bullet) {
  'use strict';

  /**
   * Initialize
   */
  Bullet.fn.initialize = function() {
    this.bullets = GAME.add.group();

    this.addProperties();
  };


  /**
   * Add bullets properties
   */
  Bullet.fn.addProperties = function() {
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
  };


  /**
   * Prepare bullets to be fired
   */
  Bullet.fn.prepareBullets = function() {
    EventBus.dispatch('bullets-ready', Bullet.fn, this.bullets);
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  Bullet.fn.bindEvents = function() {
    EventBus.addEventListener('firebutton-hit', this.prepareBullets, Bullet.fn);
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Bullet.fn.create = function() {
    this.initialize();
    this.bindEvents();
  };


  // ########################################################################################
  // ########################################################################################

  Shooter.Application.addToCreate(Bullet.fn.create.bind(Bullet.fn));
});