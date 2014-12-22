Module('Shooter.Player.ShipTrail', function(ShipTrail) {
  'use strict';

  var initialized = false;

  /**
   * Initialize
   * @param  {Object} ship
   */
  ShipTrail.fn.initializeWith = function(ship) {
    this.shipTrail = GAME.add.emitter(ship.x, ship.y + 10, 400);
    this.addProperties();
    initialized = true;
  };


  /**
   * Add ship trail properties
   */
  ShipTrail.fn.addProperties = function() {
    this.shipTrail.width = 10;
    this.shipTrail.makeParticles('bullet');
    this.shipTrail.setXSpeed(30, -30);
    this.shipTrail.setYSpeed(200, 180);
    this.shipTrail.setRotation(50, -50);
    this.shipTrail.setAlpha(1, 0.01, 800);
    this.shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
    this.shipTrail.start(false, 5000, 10);
  };


  /**
   * Keep the shipTrail lined up with the ship
   * @param  {Object} event
   * @param  {Object} ship
   */
  ShipTrail.fn.updateCoordinates = function(event, ship) {
    if(!initialized) this.initializeWith(ship);

    this.shipTrail.x = ship.x;
    this.shipTrail.y = ship.y;
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  ShipTrail.fn.bindEvents = function() {
    EventBus.addEventListener('ship-updated', this.updateCoordinates, ShipTrail.fn);
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  ShipTrail.fn.create = function() {
    this.bindEvents();
  };

  // ########################################################################################
  // ########################################################################################

  Shooter.Application.addToCreate(ShipTrail.fn.create.bind(ShipTrail.fn));
});