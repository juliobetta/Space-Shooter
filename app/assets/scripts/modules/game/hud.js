/**
 * Display game information
 */
Module('Shooter.Game.HUD', function(HUD) {
  'use strict';

  /**
   * Initialize
   */
  HUD.fn.initialize = function() {
    this.gameOver        = null;
    this.shieldStatus    = null;
    this.currentScore    = 0;
    this.scoreMultiplier = 10;

    this.scoreText = GAME.add.text(
      10, 10, 'Score: 0', {font: '20px Arial', fill: '#fff'}
    );
  };


  /**
   * Reset HUD
   * @param  {Object} event
   * @param  {Object} ship
   */
  HUD.fn.reset = function(event, ship) {
    this.currentScore = 0;
    this.gameOver.visible = false;
    this.updateShieldStatus(null, ship);
    this.updateScoreText(null, 0, 0);
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
   * Render score text on hit enemy
   * @param  {Object} event
   * @param  {Integer} enemyDamageAmount
   */
  HUD.fn.updateScoreText = function(event, enemyDamageAmount) {
    this.currentScore += enemyDamageAmount * this.scoreMultiplier;
    this.scoreText.text = 'Score: ' + this.currentScore;

    EventBus.dispatch('score-increased', HUD.fn, this.currentScore);
  };


  /**
   * Render ship's shields status
   */
  HUD.fn.updateShieldStatus = function(event, ship) {
    this.shieldStatus.text = 'Shields: ' + Math.max(ship.health, 0) + '%';
  };


  /**
   * Show game over screen
   */
  HUD.fn.showGameOverScreen = function() {
    if(this.gameOver !== null)  {
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
    this.gameOver.alpha = 0;

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
    EventBus.addEventListener('ship-revived',   this.reset,              HUD.fn);
    EventBus.addEventListener('ship-created',   this.createShieldStatus, HUD.fn);
    EventBus.addEventListener('ship-damaged',   this.updateShieldStatus, HUD.fn);
    EventBus.addEventListener('ship-destroyed', this.showGameOverScreen, HUD.fn);
    EventBus.addEventListener('enemy-hit',      this.updateScoreText,    HUD.fn);
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  HUD.fn.create = function() {
    this.initialize();
    this.bindEvents();
  };

  // ########################################################################################
  // ########################################################################################

  Shooter.States.Game.fn.addToCreate(HUD.fn.create.bind(HUD.fn));
});