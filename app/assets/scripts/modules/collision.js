Module('Shooter.Collision', function(Collision) {
  'use strict';


  /**
   * Initialize
   */
  Collision.fn.initialize = function() {
    this.explosions = GAME.add.group();
    this.addExplosionProperties();
  };


  /**
   * Add explosion properties
   */
  Collision.fn.addExplosionProperties = function() {
    this.explosions.enableBody = true;
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosions.createMultiple(30, 'explosion');
    this.explosions.setAll('anchor.x', 0.5);
    this.explosions.setAll('anchor.y', 0.5);
    this.explosions.forEach(function(explosion) {
      explosion.animations.add('explosion');
    });
  };


  /**
   * Add explosion effect after collision on enemy
   * @param {Object} explosion
   * @param {Object} enemy
   */
  Collision.fn.enemyExplosionEffect = function(explosion, enemy) {
    explosion.body.velocity.y = enemy.body.velocity.y;
    explosion.alpha = 0.7;
    explosion.play('explosion', 30, false, true);

    enemy.kill();
  };


  /**
   * Collision between player and enemy
   * @param  {Object} player
   * @param  {Object} enemy
   */
  Collision.fn.shipsCollide = function(player, enemy) {
    var explosion = this.explosions.getFirstExists(false);

    explosion.reset(
      enemy.body.x + enemy.body.halfWidth,
      enemy.body.y + enemy.body.halfHeight
    );

    this.enemyExplosionEffect(explosion, enemy);

    EventBus.dispatch('ships-collided', Collision.fn, enemy);
  };


  /**
   * Collision between bullet and enemy
   * @param  {Object} enemy
   * @param  {Object} bullet
   */
  Collision.fn.hitEnemy = function(enemy, bullet) {
    var explosion = this.explosions.getFirstExists(false);

    explosion.reset(
      bullet.body.x + bullet.body.halfWidth,
      bullet.body.y + bullet.body.halfHeight
    );

    this.enemyExplosionEffect(explosion, enemy);

    bullet.kill();
  };

  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Collision.fn.create = function() {
    this.initialize();
  };


  Collision.fn.update = function() {
    var self = this;

    // http://docs.phaser.io/Phaser.Physics.Arcade.html#overlap

    // Collision between ships
    GAME.physics.arcade.overlap(
      Shooter.Player.Ship.fn.ship,           // object 1
      Shooter.Enemies.GreenEnemy.fn.enemies, // object 2
      self.shipsCollide.bind(self),          // overlapCallback
      null,                                  // processCallback
      this                                   // callbackContext
    );

    // Collision between bullet and enemy
    GAME.physics.arcade.overlap(
      Shooter.Enemies.GreenEnemy.fn.enemies,
      Shooter.Bullet.fn.bullets,
      self.hitEnemy.bind(self),
      null,
      this
    );
  };

  // ########################################################################################
  // ########################################################################################

  Shooter.Application.addToCreate(Collision.fn.create.bind(Collision.fn));
  Shooter.Application.addToUpdate(Collision.fn.update.bind(Collision.fn));
});