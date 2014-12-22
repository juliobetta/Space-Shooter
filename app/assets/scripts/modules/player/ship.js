Module('Shooter.Player.Ship', function(Ship) {
  'use strict';

  var BULLET_SPEED   = 400,
      BULLET_SPACING = 250;

  var bulletTimer = 0;


  /**
   * Initialize
   */
  Ship.fn.initialize = function() {
    this.ship = GAME.add.sprite(400, 500, 'ship');
    this.addProperties();

    this.shields = GAME.add.text(
      GAME.world.width - 150, 10, 'Shields ' + this.ship.health + '%', {
        font: '20px Arial', fill: '#fff'
      }
    );

    this.bindEvents();
  };


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
  Ship.fn.addProperties = function() {
    this.ship.health = 100;
    this.ship.anchor.setTo(0.5, 0.5);

    GAME.physics.enable(this.ship, Phaser.Physics.ARCADE);

    this.ship.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    this.ship.body.drag.setTo(DRAG, DRAG);

    this.ship.events.onKilled.add(function() {
      EventBus.dispatch('ship-killed', Ship.fn);
    });
  };


  /**
   * Before move
   * @param  {Object} event
   */
  Ship.fn.beforeMove = function(event) {
    this.resetState();
  };


  /**
   * Move player
   * @param  {Object} event
   * @param {Integer} acceleration
   */
  Ship.fn.move = function(event, direction, acceleration) {
    if(GAME.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
      acceleration *= 3;
    }

    this.ship.body.acceleration[direction] = acceleration;
  };


  /**
   * Move ship with mouse
   * @param  {Object} event
   * @param  {Integer} inputX Game input x position
   */
  Ship.fn.moveWithMouse = function(event, inputX) {
    var minDist = 200,
        dist    = inputX - this.ship.x;

    this.ship.body.velocity.x = MAXSPEED * GAME.math.clamp(dist / minDist, -1, 1);
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
   * Fire bullets
   * @param  {Object} event
   * @param  {Array} bullets
   */
  Ship.fn.fireBullets = function(event, bullets) {
    if(!this.ship.alive) return;

    var bullet, bulletOffset;

    //  To avoid them being allowed to fire too fast we set a time limit
    if (GAME.time.now > bulletTimer) {

      // Grab the first bullet we can from the pool and fire it
      bullet = bullets.getFirstExists(false);

      if(bullet) {
        // Make bullet come out of tip of ship with right angle
        bulletOffset = 20 * Math.sin(GAME.math.degToRad(this.ship.angle));
        bullet.reset(this.ship.x + bulletOffset, this.ship.y);
        bullet.angle = this.ship.angle;

        GAME.physics.arcade.velocityFromAngle(
          bullet.angle - 90, BULLET_SPEED, bullet.body.velocity
        );

        bullet.body.velocity.x += this.ship.body.velocity.x;

        bulletTimer = GAME.time.now + BULLET_SPACING;
      }

    }
  };


  /**
   * Render ship's shields status
   */
  Ship.fn.renderShieldStatus = function() {
    this.shields.text = 'Shields: ' + Math.max(this.ship.health, 0) + '%';
  };


  /**
   * Add damage to the ship
   * @param {Object} event
   * @param {Object} enemy The enemy that collided to the ship
   */
  Ship.fn.addDamage = function(event, enemy) {
    this.ship.damage(enemy.damageAmount);
    this.renderShieldStatus();
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  Ship.fn.bindEvents = function() {
    EventBus.addEventListener('before-key-pressed', this.beforeMove,    Ship.fn);
    EventBus.addEventListener('cursorkey-pressed',  this.move,          Ship.fn);
    EventBus.addEventListener('mouse-moved',        this.moveWithMouse, Ship.fn);
    EventBus.addEventListener('bullets-ready',      this.fireBullets,   Ship.fn);
    EventBus.addEventListener('ships-collided',     this.addDamage,     Ship.fn);
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Ship.fn.create = function() {
    this.initialize();
  };


  Ship.fn.update = function() {
    this.stopAtScreenEdges();
    this.createBankEffect();

    EventBus.dispatch('ship-updated', Ship.fn, this.ship);
  };


  Ship.fn.render = function() {
    // GAME.debug.body(this.ship);
  };

  // ########################################################################################
  // ########################################################################################

  Shooter.Application.addToCreate(Ship.fn.create.bind(Ship.fn));
  Shooter.Application.addToUpdate(Ship.fn.update.bind(Ship.fn));
  Shooter.Application.addToRender(Ship.fn.render.bind(Ship.fn));
});