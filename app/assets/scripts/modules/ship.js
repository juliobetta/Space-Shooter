Module('Shooter.Ship', function(Ship) {
  'use strict';


  /**
   * Reset player state
   */
  Ship.fn.resetState = function() {
    this.ship.body.acceleration.x = 0;
    this.ship.body.acceleration.y = 0;
  };


  /**
   * Add player properties
   */
  Ship.fn.addShipProperties = function() {
    this.ship.anchor.setTo(0.5, 0.5);

    GAME.physics.enable(this.ship, Phaser.Physics.ARCADE);

    this.ship.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    this.ship.body.drag.setTo(DRAG, DRAG);
  };


  /**
   * Add ship trail properties
   */
  Ship.fn.addShipTrailProperties = function() {
    this.shipTrail.width = 10;
    this.shipTrail.makeParticles('bullet');
    this.shipTrail.setXSpeed(30, -30);
    this.shipTrail.setYSpeed(200, 180);
    this.shipTrail.setRotation(50, -50);
    this.shipTrail.setAlpha(1, 0.01, 800);
    this.shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
    this.shipTrail.start(false, 5000, 10);
  };


  /**
   * Before move
   */
  Ship.fn.beforeMove = function(event) {
    this.resetState();
  };


  /**
   * Move player
   * @param {Integer} acceleration
   */
  Ship.fn.move = function(event, direction, acceleration) {
    if(GAME.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
      acceleration *= 3;
    }

    this.ship.body.acceleration[direction] = acceleration;
  };


  /**
   * Stop player at screen edges
   */
  Ship.fn.stopAtScreenEdges = function() {
    var self = this, dimension;

    ['x', 'y'].forEach(function(direction) {
      dimension = direction === 'y' ? 'height' : 'width';

      if(self.ship[direction] > GAME[dimension] - 50) {
        self.ship[direction] = GAME[dimension] - 50;
        self.ship.body.acceleration[direction] = 0;
      }

      if(self.ship[direction] < 50) {
        self.ship[direction] = 50;
        self.ship.body.acceleration[direction] = 0;
      }
    });
  };


  /**
   * Squish and rotate ship for illusion of "bank"
   */
  Ship.fn.createBankEffect = function() {
    var bank = this.ship.body.velocity.x / MAXSPEED;
    this.ship.scale.x = 1 - Math.abs(bank) / 2;
    this.ship.angle = bank * 30;
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  Ship.fn.bindEvents = function() {
    EventBus.addEventListener('before-cursorkey-pressed', this.beforeMove, Ship.fn);
    EventBus.addEventListener('cursorkey-pressed', this.move, Ship.fn);
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Ship.fn.preload = function() {
    GAME.load.image('ship',   '/assets/images/ship.png');
    GAME.load.image('bullet', '/assets/images/bullet.png');
  };


  Ship.fn.create = function() {
    this.ship = GAME.add.sprite(400, 500, 'ship');
    this.shipTrail = GAME.add.emitter(this.ship.x, this.ship.y + 10, 400);

    this.addShipProperties();
    this.addShipTrailProperties();
    this.bindEvents();
  };


  Ship.fn.update = function() {
    this.stopAtScreenEdges();
    this.createBankEffect();

    //  Keep the shipTrail lined up with the ship
    this.shipTrail.x = this.ship.x;
    this.shipTrail.y = this.ship.y;
  };

  // ########################################################################################
  // ########################################################################################


  Shooter.Application.addToPreload(Ship.fn.preload.bind(Ship.fn));
  Shooter.Application.addToCreate(Ship.fn.create.bind(Ship.fn));
  Shooter.Application.addToUpdate(Ship.fn.update.bind(Ship.fn));
});