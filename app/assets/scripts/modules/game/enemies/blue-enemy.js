Module('Shooter.Game.Enemies.BlueEnemy', function(BlueEnemy) {
  'use strict';

  var TOTAL_IN_WAVE     = 5,
      TIME_BTW_WAVES    = 2500,
      VERTICAL_SPACING  = 70,
      FREQUENCY         = 70,
      SPREAD            = 60,
      ENEMY_SPEED       = 180,
      BULLET_SPEED      = 400,
      FIRING_DELAY      = 2000,
      DAMAGE_AMOUNT     = 40,
      ASSET_NAME        = 'enemy-blue',
      TOTAL_PER_TIME    = 30;


  Shooter.extend(BlueEnemy.fn, Shooter.Game.Enemies.Base.fn);

  /**
   * Initializer
   */
  BlueEnemy.fn.initialize = function() {
    this.enemiesLaunched = false;
    this.super.initialize();
  };


  /**
   * Reset
   */
  BlueEnemy.fn.reset = function() {
    this.enemiesLaunched = false;
    this.super.reset();
  };


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
   * Get firing delay
   * @return {Integer}
   */
  BlueEnemy.fn.getFiringDelay = function() {
    return FIRING_DELAY;
  };


  /**
   * Get bullet speed
   * @return {Integer}
   */
  BlueEnemy.fn.getBulletSpeed = function() {
    return BULLET_SPEED;
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
    var startingX = GAME.rnd.integerInRange(100, GAME.width - 100),
        enemy;

    for(var i = 0; i < TOTAL_IN_WAVE; i++) {
      enemy = this.enemies.getFirstExists(false);

      if(enemy) {
        enemy.reset(GAME.width / 2, -VERTICAL_SPACING * i);

        enemy.startingX       = startingX;
        enemy.body.velocity.y = ENEMY_SPEED;
        enemy.bullets         = 1;
        enemy.lastShot        = 0;

        enemy.update = function() {
          // Wave moviment
          this.body.x = this.startingX + Math.sin(this.y / FREQUENCY) * SPREAD;

          // Squish and rotate for illusion of "banking"
          var bank = Math.cos((this.y + 60) / FREQUENCY);

          this.scale.x = 0.5 - Math.abs(bank) / 8;
          this.angle   = 180 - bank * 2;

          EventBus.dispatch('blue-enemy-updated', BlueEnemy.fn, this);

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
   * Enemies come quicker as score increases
   * @param {Object} event
   * @param {Integer} currentScore
   */
  BlueEnemy.fn.increasePacing = function(event, currentScore) {
    if(!this.enemiesLaunched && currentScore > 1000) {
      this.enemiesLaunched = true;
      this.lauchEnemy();
    }
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  BlueEnemy.fn.bindEvents = function() {
    EventBus.addEventListener('restart-hit',     this.reset,          BlueEnemy.fn);
    EventBus.addEventListener('score-increased', this.increasePacing, BlueEnemy.fn);
  };


  // ########################################################################################
  // ########################################################################################

  Shooter.States.Game.fn.addToCreate(BlueEnemy.fn.create.bind(BlueEnemy.fn));
  Shooter.States.Game.fn.addToUpdate(BlueEnemy.fn.update.bind(BlueEnemy.fn));
  Shooter.States.Game.fn.addToRender(BlueEnemy.fn.render.bind(BlueEnemy.fn));
});