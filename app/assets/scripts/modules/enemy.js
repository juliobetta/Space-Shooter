Module('Shooter.Enemy', function(Enemy) {
  'use strict';

  /**
   * Initialize
   */
  Enemy.fn.initialize = function() {
    this.greenEnemies = GAME.add.group();
    this.addGreenEnemyProperties();
  };


  /**
   * Add common properties for an enemy group
   * @param {Object} enemyGroup
   */
  Enemy.fn.addCommonPropertiesFor = function(enemyGroup) {
    enemyGroup.enableBody = true;
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

    enemyGroup.setAll('anchor.x', 0.5);
    enemyGroup.setAll('anchor.y', 0.5);
    enemyGroup.setAll('scale.x', 0.5);
    enemyGroup.setAll('scale.y', 0.5);
    enemyGroup.setAll('angle', 180);
    enemyGroup.setAll('outOfBoundsKill', true);
    enemyGroup.setAll('checkWorldBounds', true);
  };


  /**
   * Add green enemy properties
   */
  Enemy.fn.addGreenEnemyProperties = function() {
    this.greenEnemies.createMultiple(5, 'enemy-green');
    addCommonPropertiesFor(this.greenEnemies);
  };


  /**
   * Launch green enemy
   */
  Enemy.fn.lauchGreenEnemy = function() {

  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Enemy.fn.create = function() {
    this.initialize();
  };


  Enemy.fn.update = function() {
  };

  // ########################################################################################
  // ########################################################################################

  Shooter.Application.addToCreate(Enemy.fn.create.bind(Enemy.fn));
  Shooter.Application.addToUpdate(Enemy.fn.update.bind(Enemy.fn));
});