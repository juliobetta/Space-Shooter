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
    var self = this;

    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemies.createMultiple(5, 'enemy-green');

    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('anchor.y', 0.5);
    this.enemies.setAll('scale.x', 0.5);
    this.enemies.setAll('scale.y', 0.5);
    this.enemies.setAll('angle', 180);

    this.enemies.forEach(function(enemy) {
      self.addEnemyEmitterTrail(enemy);
      enemy.body.setSize(enemy.width * 3/4, enemy.height * 3/4);
      enemy.events.onKilled.add(function() {
        enemy.trail.kill;
      });
    });
  };


  /**
   * Add emiter trail for enemy
   */
  GreenEnemy.fn.addEnemyEmitterTrail = function(enemy) {
    var enemyTrail = GAME.add.emitter(enemy.x, enemy.y - 10, 100);

    enemyTrail.width = 10;
    enemyTrail.makeParticles('explosion', [1,2,3,4,5]);
    enemyTrail.setXSpeed(20, -20);
    enemyTrail.setRotation(50, -50);
    enemyTrail.setAlpha(0.4, 0, 800);
    enemyTrail.setScale(0.01, 0.1, 0.01, 0.1, 1000, Phaser.Easing.Quintic.Out);
    enemy.trail = enemyTrail;
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

      enemy.trail.start(false, 800, 1);

      enemy.update = function() {
        enemy.angle = 180 - GAME.math.radToDeg(
          Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y)
        );

        enemy.trail.x = enemy.x;
        enemy.trail.y = enemy.y;

        // Kill enemies once they go off screen
        if(enemy.y > GAME.height + 200) {
          enemy.kill();
        }
      };
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


  GreenEnemy.fn.render = function() {
    // for(var i = 0; i < this.enemies.length; i++) {
    //   GAME.debug.body(this.enemies.children[i]);
    // }
  };

  // ########################################################################################
  // ########################################################################################

  Shooter.Application.addToCreate(GreenEnemy.fn.create.bind(GreenEnemy.fn));
  Shooter.Application.addToUpdate(GreenEnemy.fn.update.bind(GreenEnemy.fn));
  Shooter.Application.addToRender(GreenEnemy.fn.render.bind(GreenEnemy.fn));
});