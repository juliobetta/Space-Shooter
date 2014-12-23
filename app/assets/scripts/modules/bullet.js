Module('Shooter.Bullet', function(Bullet) {
  'use strict';

  /**
   * Initialize
   */
  Bullet.fn.initialize = function() {
    this.playerBullets    = GAME.add.group();
    this.blueEnemyBullets = GAME.add.group();

    this.addPlayerBulletProperties();
    this.addBlueEnemyBulletProperties();
  };


  /**
   * Reset
   */
  Bullet.fn.reset = function() {
    this.blueEnemyBullets.callAll('kill');
  };


  /**
   * Get player bullets
   * @return {Array}
   */
  Bullet.fn.getPlayerBullets = function() {
    return this.playerBullets;
  };


  /**
   * Get blue enemy bullets
   * @return {Array}
   */
  Bullet.fn.getBlueEnemyBullets = function() {
    return this.blueEnemyBullets;
  };


  /**
   * Add properties to player's bullets
   */
  Bullet.fn.addPlayerBulletProperties = function() {
    this.playerBullets.enableBody = true;
    this.playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.playerBullets.createMultiple(30, 'bullet');
    this.playerBullets.setAll('anchor.x', 0.5);
    this.playerBullets.setAll('anchor.y', 1);
    this.playerBullets.setAll('outOfBoundsKill', true);
    this.playerBullets.setAll('checkWorldBounds', true);
  };


  /**
   * Add properties to blue enemy's bullets
   */
  Bullet.fn.addBlueEnemyBulletProperties = function() {
    this.blueEnemyBullets.enableBody = true;
    this.blueEnemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.blueEnemyBullets.createMultiple(30, 'enemy-blue-bullet');
    this.blueEnemyBullets.callAll('crop', null, { x: 90, y: 0, width: 90, height: 70 });
    this.blueEnemyBullets.setAll('alpha', 0.9);
    this.blueEnemyBullets.setAll('anchor.x', 0.5);
    this.blueEnemyBullets.setAll('anchor.y', 0.5);
    this.blueEnemyBullets.setAll('outOfBoundsKill', true);
    this.blueEnemyBullets.setAll('checkWorldBounds', true);
    this.blueEnemyBullets.forEach(function(bullet) {
      bullet.body.setSize(20, 20);
    });
  };


  /**
   * Prepare bullets to be fired
   */
  Bullet.fn.preparePlayerBullets = function() {
    EventBus.dispatch('bullets-ready', Bullet.fn, this.playerBullets);
  };


  /**
   * Shoot enemy bullets
   * @param {Object} event
   * @param {Object} enemy
   */
  Bullet.fn.shootEnemyBullet = function(event, enemy) {
    var bullet = this.blueEnemyBullets.getFirstExists(false),
        player = Shooter.Player.Ship.fn.getShip(),
        angle;

    if(bullet
        && enemy.alive
        && enemy.bullets
        && enemy.y > GAME.width / 8
        && GAME.time.now > event.target.getFiringDelay() + enemy.lastShot
    ) {
      enemy.lastShot = GAME.time.now;
      enemy.bullets -= 1;

      bullet.reset(enemy.x, enemy.y + enemy.height / 2);
      bullet.damageAmount = enemy.damageAmount;

      angle = GAME.physics.arcade.moveToObject(bullet, player, event.target.getBulletSpeed());
      bullet.angle = GAME.math.radToDeg(angle);
    }
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  Bullet.fn.bindEvents = function() {
    EventBus.addEventListener('firebutton-hit',     this.preparePlayerBullets, Bullet.fn);
    EventBus.addEventListener('blue-enemy-updated', this.shootEnemyBullet,     Bullet.fn);
    EventBus.addEventListener('restart-hit',        this.reset,                Bullet.fn);
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