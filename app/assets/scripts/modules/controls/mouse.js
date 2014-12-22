/**
 * Add mouse controls to play the game
 */
Module('Shooter.Controls.Mouse', function(Mouse) {
  'use strict';

  var fireButtonEvt = 'firebutton-hit';

  /**
   * Move sideways
   */
  Mouse.fn.moveSideways = function() {
    if(GAME.input.x < GAME.width - 20 &&
       GAME.input.x > 20 &&
       GAME.input.y > 20 &&
       GAME.input.y < GAME.height - 20)
    {
      EventBus.dispatch('mouse-moved', Mouse.fn, GAME.input.x);
    }
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  Mouse.fn.bindEvents = function() {
    EventBus.addEventListener('ship-destroyed', function() { fireButtonEvt = 'restart-hit'; });
    EventBus.addEventListener('ship-revived', function() { fireButtonEvt = 'firebutton-hit';});
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Mouse.fn.create = function() {
    this.bindEvents();
  };


  Mouse.fn.update = function() {
    this.moveSideways();

    if(GAME.input.activePointer.isDown) {
      console.log(fireButtonEvt);
      EventBus.dispatch(fireButtonEvt, Mouse.fn);
    }
  };

  // ########################################################################################
  // ########################################################################################

  Shooter.Application.addToCreate(Mouse.fn.create.bind(Mouse.fn));
  Shooter.Application.addToUpdate(Mouse.fn.update.bind(Mouse.fn));
});