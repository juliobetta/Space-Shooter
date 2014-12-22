/**
 * Display game information
 */
Module('Shooter.HUD', function(HUD) {
  'use strict';


  /**
   * Reset HUD
   * @param  {Object} event
   * @param  {Object} ship
   */
  HUD.fn.resetHUD = function(event, ship) {
    this.gameOver.visible = false;
    this.renderShieldStatus(null, ship);
  };


  /**
   * Create Shield Status hud
   * @param  {Object} event
   * @param  {Object} ship
   */
  HUD.fn.createShieldStatus = function(event, ship) {
    this.shieldStatus = GAME.add.text(
      GAME.world.width - 150, 10, 'Shields ' + ship.health + '%', {
        font: '20px Arial', fill: '#fff'
      }
    );
  };


  /**
   * Render ship's shields status
   */
  HUD.fn.renderShieldStatus = function(event, ship) {
    this.shieldStatus.text = 'Shields: ' + Math.max(ship.health, 0) + '%';
  };


  /**
   * Show game over screen
   */
  HUD.fn.showGameOverScreen = function() {
    if(this.gameOver)  {
      this.gameOver.visible = true;
      return;
    }

    var fadeInGameOver;

    this.gameOver = GAME.add.text(
      GAME.world.centerX, GAME.world.centerY, 'GAME OVER!', {
        font: '84px Arial', fill: '#fff'
      }
    );

    this.gameOver.anchor.setTo(0.5, 0.5);

    fadeInGameOver = GAME.add.tween(this.gameOver);
    fadeInGameOver.to({alpha: 1}, 1000, Phaser.Easing.Quintic.Out);
    fadeInGameOver.start();
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  HUD.fn.bindEvents = function() {
    EventBus.addEventListener('ship-created',   this.createShieldStatus, HUD.fn);
    EventBus.addEventListener('ship-revived',   this.resetHUD,           HUD.fn);
    EventBus.addEventListener('ship-damaged',   this.renderShieldStatus, HUD.fn);
    EventBus.addEventListener('ship-destroyed', this.showGameOverScreen, HUD.fn);
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  HUD.fn.create = function() {
    this.bindEvents();
  };

  // ########################################################################################
  // ########################################################################################

  Shooter.Application.addToCreate(HUD.fn.create.bind(HUD.fn));
});