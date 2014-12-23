Module('Shooter.Enemies.BlueEnemy', function(BlueEnemy) {
  'use strict';

  var TOTAL_IN_WAVE     = 5,
      TIME_BTW_WAVES    = 7000,
      VERTICAL_SPACING  = 70,
      FREQUENCY         = 70,
      SPREAD            = 60,
      ENEMY_SPEED       = 180,
      DAMAGE_AMOUNT     = 40,
      ASSET_NAME        = 'enemy-blue',
      TOTAL_PER_TIME    = 30;


  Shooter.extend(BlueEnemy.fn, Shooter.Enemies.Base.fn);


  /**
   * Get asset name
   * @return {String}
   */
  BlueEnemy.fn.getAssetName = function() {
    return ASSET_NAME;
  };


  /**
   * Get total enemies per time
   * @return {Integer}
   */
  BlueEnemy.fn.getTotalPerTime = function() {
    return TOTAL_PER_TIME;
  };


  /**
   * Add property for each enemy
   */
  BlueEnemy.fn.addPropertiesForEach = function(enemy) {
    enemy.body.setSize(enemy.width * 2, enemy.height * 2);
    enemy.damageAmount = DAMAGE_AMOUNT;
  };


  /**
   * Launch green enemy
   */
  BlueEnemy.fn.lauchEnemy = function() {
    var startingX = GAME.rnd.integerInRange(100, GAME.width - 100);

    for(var i = 0; i < TOTAL_IN_WAVE; i++) {
      var enemy = this.enemies.getFirstExists(false);

      if(enemy) {
        enemy.startingX = startingX;
        enemy.reset(GAME.width / 2, -VERTICAL_SPACING * i);
        enemy.body.velocity.y = ENEMY_SPEED;

        enemy.update = function() {
          // Wave moviment
          this.body.x = this.startingX + Math.sin(this.y / FREQUENCY) * SPREAD;

          // Squish and rotate for illusion of "banking"
          var bank = Math.cos((this.y + 60) / FREQUENCY);

          this.scale.x = 0.5 - Math.abs(bank) / 8;
          this.angle   = 180 - bank * 2;

          // Kill enemies once they go off screen
          if(this.y > GAME.height + 200) {
            this.kill();
          }
        };
      }
    }

    // Send another enemy soon
    this.enemyLaunchTimer = GAME.time.events.add(TIME_BTW_WAVES, this.lauchEnemy.bind(this));
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  BlueEnemy.fn.bindEvents = function() {
    EventBus.addEventListener('restart-hit', this.reset, BlueEnemy.fn);
  };


  // ########################################################################################
  // ########################################################################################

  Shooter.Application.addToCreate(BlueEnemy.fn.create.bind(BlueEnemy.fn));
  Shooter.Application.addToUpdate(BlueEnemy.fn.update.bind(BlueEnemy.fn));
  Shooter.Application.addToRender(BlueEnemy.fn.render.bind(BlueEnemy.fn));
});