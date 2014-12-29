Module('Shooter.Game.Player.Ship', function(Ship) {
  'use strict';

  var BULLET_SPEED        = 400,
      BULLET_SPACING_LVL1 = 250,
      BULLET_SPACING_LVL2 = 550;

  /**
   * Initialize
   */
  Ship.fn.initialize = function() {
    this.ship = GAME.add.sprite(400, 500, 'ship');
    this.addProperties();

    EventBus.dispatch('ship-created', Ship.fn, this.ship);

    this.bindEvents();
  };


  /**
   * Get Ship
   * @return {Object}
   */
  Ship.fn.getShip = function() {
    return this.ship;
  };


  /**
   * Reset ship
   */
  Ship.fn.reset = function() {
    this.ship.revive();
    this.ship.health      = 100;
    this.ship.weaponLevel = 1;
    this.ship.bulletTimer = 0;
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
    this.ship.health      = 100;
    this.ship.weaponLevel = 1;
    this.ship.bulletTimer = 0;

    this.ship.anchor.setTo(0.5, 0.5);

    GAME.physics.enable(this.ship, Phaser.Physics.ARCADE);

    this.ship.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    this.ship.body.drag.setTo(DRAG, DRAG);
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
   * @param {Object} event
   * @param {Integer} inputX Game input x position
   * @param {Integer} inputY Game input y position
   */
  Ship.fn.moveWithMouse = function(event, inputX, inputY) {
    var minDist = 200,
        distX   = inputX - this.ship.x,
        distY   = inputY - this.ship.y;

    this.ship.body.velocity.x = MAXSPEED * GAME.math.clamp(distX / minDist, -1, 1);
    this.ship.body.velocity.y = MAXSPEED * GAME.math.clamp(distY / minDist, -1, 1);
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
   * Make bullet come out of tip of ship with right angle
   * @param  {Object} bullet
   */
  Ship.fn.resetBullet = function(bullet) {
    var bulletOffset = 20 * Math.sin(GAME.math.degToRad(this.ship.angle));
    bullet.reset(this.ship.x + bulletOffset, this.ship.y);
  };


  /**
   * Fire bullets
   * @param  {Object} event
   * @param  {Array} bullets
   */
  Ship.fn.fireBullets = function(event, bullets) {
    if(!this.ship.alive) return;

    var bullet, bulletOffset, spreadAngle;

    //  To avoid them being allowed to fire too fast we set a time limit
    if(GAME.time.now > this.ship.bulletTimer) {

      switch(this.ship.weaponLevel) {
        case 1:
          // Grab the first bullet we can from the pool and fire it
          bullet = bullets.getFirstExists(false);

          if(bullet) {
            this.resetBullet(bullet);

            bullet.angle = this.ship.angle;

            GAME.physics.arcade.velocityFromAngle(
              bullet.angle - 90, BULLET_SPEED, bullet.body.velocity
            );

            bullet.body.velocity.x += this.ship.body.velocity.x;

            this.ship.bulletTimer = GAME.time.now + BULLET_SPACING_LVL1;
          }
          break;

        case 2:
          for(var i = 0; i < 3; i++) {
            bullet = bullets.getFirstExists(false);

            if(bullet) {
              this.resetBullet(bullet);

              // Spread angle of 1st and 3rd bullets
              if(i === 0) spreadAngle = -20;
              if(i === 1) spreadAngle = 0;
              if(i === 2) spreadAngle = 20;

              bullet.angle = this.ship.angle + spreadAngle;
              GAME.physics.arcade.velocityFromAngle(
                spreadAngle - 90, BULLET_SPEED, bullet.body.velocity
              );
              bullet.body.velocity.x += this.ship.body.velocity.x;

              this.ship.bulletTimer = GAME.time.now + BULLET_SPACING_LVL2;
            }
          }
      }

    }
  };


  /**
   * Create player's death explosion
   */
  Ship.fn.playDeathExplosion = function() {
    var deathExplosion = GAME.add.emitter(this.ship.x, this.ship.y);

    deathExplosion.width  = 50;
    deathExplosion.height = 50;
    deathExplosion.x      = this.ship.x;
    deathExplosion.y      = this.ship.y;

    deathExplosion.makeParticles('explosion', [0,1,2,3,4,5,6,7], 10);
    deathExplosion.setAlpha(0.9, 0, 800);
    deathExplosion.setScale(0.1, 0.6, 0.1, 0.6, 1000, Phaser.Easing.Quintic.OUT);
    deathExplosion.start(false, 1000, 10, 10);

  };


  /**
   * Add damage to the ship
   * @param {Object}  event
   * @param {Integer} damage amount
   */
  Ship.fn.addDamage = function(event, damageAmount) {
    this.ship.damage(damageAmount);

    if(this.ship.health <= 0) {
      this.playDeathExplosion();
    }

    EventBus.dispatch('ship-damaged', Ship.fn, this.ship);
  };


  /**
   * Update weapon if score > 4000
   * @param  {Object} event
   * @param  {Integer} currentScore
   */
  Ship.fn.upgradeWeapon = function(event, currentScore) {
    if(currentScore > 4000 && this.ship.weaponLevel < 2) {
      this.ship.weaponLevel = 2;
    }
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  Ship.fn.bindEvents = function() {
    var self = this;

    EventBus.addEventListener('before-key-pressed', this.beforeMove,    Ship.fn);
    EventBus.addEventListener('cursorkey-pressed',  this.move,          Ship.fn);
    EventBus.addEventListener('mouse-moved',        this.moveWithMouse, Ship.fn);
    EventBus.addEventListener('bullets-ready',      this.fireBullets,   Ship.fn);
    EventBus.addEventListener('ships-collided',     this.addDamage,     Ship.fn);
    EventBus.addEventListener('player-hit',         this.addDamage,     Ship.fn);
    EventBus.addEventListener('restart-hit',        this.reset,         Ship.fn);
    EventBus.addEventListener('score-increased',    this.upgradeWeapon,  Ship.fn);

    this.ship.events.onKilled.add(function() {
      EventBus.dispatch('ship-destroyed', Ship.fn, self.ship);
    });

    this.ship.events.onRevived.add(function() {
      self.ship.health = 100;
      EventBus.dispatch('ship-revived', Ship.fn, self.ship);
    });
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
    if(!this.ship.alive) return;

    this.stopAtScreenEdges();
    this.createBankEffect();

    EventBus.dispatch('ship-updated', Ship.fn, this.ship);
  };


  Ship.fn.render = function() {
    // GAME.debug.body(this.ship);
  };

  // ########################################################################################
  // ########################################################################################

  Shooter.States.Game.fn.addToCreate(Ship.fn.create.bind(Ship.fn));
  Shooter.States.Game.fn.addToUpdate(Ship.fn.update.bind(Ship.fn));
  Shooter.States.Game.fn.addToRender(Ship.fn.render.bind(Ship.fn));
});