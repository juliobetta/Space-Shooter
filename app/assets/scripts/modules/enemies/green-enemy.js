Module('Shooter.Enemies.GreenEnemy', function(GreenEnemy) {
  'use strict';

  var MIN_ENEMY_SPACING = 300,
      MAX_ENEMY_SPACING = 3000,
      ENEMY_SPEED       = 300;

  /**
   * Initialize
   */
  GreenEnemy.fn.initialize = function() {
    this.enemies = GAME.add.group();
    this.addProperties();
    this.lauchEnemy();
  };


  /**
   * Add green enemy properties
   */
  GreenEnemy.fn.addProperties = function() {
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemies.createMultiple(5, 'enemy-green');

    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('anchor.y', 0.5);
    this.enemies.setAll('scale.x', 0.5);
    this.enemies.setAll('scale.y', 0.5);
    this.enemies.setAll('angle', 180);
    this.enemies.setAll('outOfBoundsKill', true);
    this.enemies.setAll('checkWorldBounds', true);
  };


  /**
   * Launch green enemy
   */
  GreenEnemy.fn.lauchEnemy = function() {
    var enemy = this.enemies.getFirstExists(false);

    if(enemy) {
      enemy.reset(GAME.rnd.integerInRange(0, GAME.width), -20);

      enemy.body.velocity.x = GAME.rnd.integerInRange(-300, 300);
      enemy.body.velocity.y = ENEMY_SPEED;
      enemy.body.drag.x     = 100;
    }

    // Send another enemy soon
    GAME.time.events.add(
      GAME.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING),
      this.lauchEnemy.bind(this)
    )
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  GreenEnemy.fn.create = function() {
    this.initialize();
  };


  GreenEnemy.fn.update = function() {
  };

  // ########################################################################################
  // ########################################################################################

  Shooter.Application.addToCreate(GreenEnemy.fn.create.bind(GreenEnemy.fn));
  Shooter.Application.addToUpdate(GreenEnemy.fn.update.bind(GreenEnemy.fn));
});