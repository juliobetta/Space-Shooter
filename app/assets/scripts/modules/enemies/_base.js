Module('Shooter.Enemies.Base', function(Base) {
  'use strict';


  /**
   * Initialize
   */
  Base.fn.initialize = function() {
    this.enemyLaunchTimer = 0;
    this.enemies = GAME.add.group();
    this.addGroupProperties();
  };


  /**
   * Get enemies
   * @return {Array}
   */
  Base.fn.getEnemies = function() {
    return this.enemies;
  };


  /**
   * Restart
   */
  Base.fn.reset = function() {
    this.enemies.callAll('kill');
    GAME.time.events.remove(this.enemyLaunchTimer);
  };


  /**
   * Add emiter trail for enemy
   */
  Base.fn.addEnemyEmitterTrail = function(enemy) {
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
   * Add green enemy properties
   */
  Base.fn.addGroupProperties = function() {
    var self = this;

    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemies.createMultiple(this.getTotalPerTime(), this.getAssetName());

    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('anchor.y', 0.5);
    this.enemies.setAll('scale.x', 0.5);
    this.enemies.setAll('scale.y', 0.5);
    this.enemies.setAll('angle', 180);

    this.enemies.forEach(function(enemy) {
      self.addPropertiesForEach(enemy);
    });
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Base.fn.create = function() {
    this.initialize();
    this.bindEvents();
  };


  Base.fn.update = function() {
  };


  Base.fn.render = function() {
    // for(var i = 0; i < this.enemies.length; i++) {
    //   GAME.debug.body(this.enemies.children[i]);
    // }
  };

});