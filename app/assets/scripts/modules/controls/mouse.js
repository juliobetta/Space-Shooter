/**
 * Add mouse controls to play the game
 */
Module('Shooter.Controls.Mouse', function(Mouse) {
  'use strict';


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Mouse.fn.update = function() {
    if(GAME.input.x < GAME.width - 20 &&
       GAME.input.x > 20 &&
       GAME.input.y > 20 &&
       GAME.input.y < GAME.height - 20)
    {
      EventBus.dispatch('mouse-moved', Mouse.fn, GAME.input.x);
    }
  };

  // ########################################################################################
  // ########################################################################################


  Shooter.Application.addToUpdate(Mouse.fn.update.bind(Mouse.fn));
});