Module('Shooter.Player', function(Player) {
  'use strict';


  /**
   * Reset player state
   */
  Player.fn.resetState = function() {
    this.player.body.acceleration.x = 0;
    this.player.body.acceleration.y = 0;
  };


  /**
   * Add player properties
   */
  Player.fn.addProperties = function() {
    this.player.anchor.setTo(0.5, 0.5);

    GAME.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    this.player.body.drag.setTo(DRAG, DRAG);
  }


  /**
   * Before move
   */
  Player.fn.beforeMove = function(event) {
    this.resetState();
  };


  /**
   * Move player
   * @param {Integer} acceleration
   */
  Player.fn.move = function(event, direction, acceleration) {
    if(GAME.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
      acceleration *= 3;
    }

    this.player.body.acceleration[direction] = acceleration;
  };


  /**
   * Squish and rotate ship for illusion of "bank"
   */
  Player.fn.createBankEffect = function() {
    var bank = this.player.body.velocity.x / MAXSPEED;
    this.player.scale.x = 1 - Math.abs(bank) / 2;
    this.player.angle = bank * 10;
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  Player.fn.bindEvents = function() {
    EventBus.addEventListener('before-cursorkey-pressed', this.beforeMove, Player.fn);
    EventBus.addEventListener('cursorkey-pressed', this.move, Player.fn);
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Player.fn.preload = function() {
    GAME.load.image('player', '/assets/images/player.png');
  };


  Player.fn.create = function() {
    this.player = GAME.add.sprite(400, 500, 'player');
    this.addProperties();
    this.bindEvents();
  };


  Player.fn.update = function() {
    this.createBankEffect();
  };

  // ########################################################################################
  // ########################################################################################


  Shooter.Application.addToPreload(Player.fn.preload.bind(Player.fn));
  Shooter.Application.addToCreate(Player.fn.create.bind(Player.fn));
  Shooter.Application.addToUpdate(Player.fn.update.bind(Player.fn));
});