Module('Shooter.Enemies.GreenEnemy', function(GreenEnemy) {
  'use strict';

  var MIN_ENEMY_SPACING = 300,
      MAX_ENEMY_SPACING = 3000,
      ENEMY_SPEED       = 300,
      DAMAGE_AMOUNT     = 20,
      ASSET_NAME        = 'enemy-green',
      TOTAL_PER_TIME    = 5;


  Shooter.extend(GreenEnemy.fn, Shooter.Enemies.Base.fn);


  /**
   * Get asset name
   * @return {String}
   */
  GreenEnemy.fn.getAssetName = function() {
    return ASSET_NAME;
  };


  /**
   * Get total enemies per time
   * @return {Integer}
   */
  GreenEnemy.fn.getTotalPerTime = function() {
    return TOTAL_PER_TIME;
  };


  /**
   * Add property for each enemy
   */
  GreenEnemy.fn.addPropertiesForEach = function(enemy) {
    this.addEnemyEmitterTrail(enemy);
    enemy.body.setSize(enemy.width * 3/4, enemy.height * 3/4);
    enemy.damageAmount = DAMAGE_AMOUNT;
    enemy.events.onKilled.add(function() {
      enemy.trail.kill();
    });
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
    this.enemyLaunchTimer = GAME.time.events.add(
      GAME.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING),
      this.lauchEnemy.bind(this)
    );
  };


 /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  GreenEnemy.fn.bindEvents = function() {
    EventBus.addEventListener('restart-hit', this.reset, GreenEnemy.fn);
  };

  // ########################################################################################
  // ########################################################################################


  Shooter.Application.addToCreate(GreenEnemy.fn.create.bind(GreenEnemy.fn));
  Shooter.Application.addToUpdate(GreenEnemy.fn.update.bind(GreenEnemy.fn));
  Shooter.Application.addToRender(GreenEnemy.fn.render.bind(GreenEnemy.fn));
});