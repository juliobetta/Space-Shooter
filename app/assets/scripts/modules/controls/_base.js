Module('Shooter.Controls.Base', function(Base) {
  'use strict';

  var fireButtonEvt = 'firebutton-hit';


  /**
   * Initializer
   */
  Base.fn.initialize = function() {};


  /**
   * Get firebutton event name
   * @return {String}
   */
  Base.fn.getFireButtonEvent = function() {
    return fireButtonEvt;
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  Base.fn.bindEvents = function() {
    EventBus.addEventListener('ship-destroyed', function() { fireButtonEvt = 'restart-hit'; });
    EventBus.addEventListener('ship-revived', function() { fireButtonEvt = 'firebutton-hit';});
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

});