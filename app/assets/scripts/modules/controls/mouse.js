/**
 * Add mouse controls to play the game
 */
Module('Shooter.Controls.Mouse', function(Mouse) {
  'use strict';

  Shooter.extend(Mouse.fn, Shooter.Controls.Base.fn);

  /**
   * Initialize
   */
  Mouse.fn.initialize = function() {
    this.leftButton = GAME.input.activePointer;
  };


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
   * Main states ############################################################################
   * ########################################################################################
  */

  Mouse.fn.update = function() {
    this.moveSideways();

    if(this.leftButton.isDown) {
      EventBus.dispatch(this.getFireButtonEvent(), Mouse.fn);
    }
  };

  // ########################################################################################
  // ########################################################################################

  Shooter.Application.addToCreate(Mouse.fn.create.bind(Mouse.fn));
  Shooter.Application.addToUpdate(Mouse.fn.update.bind(Mouse.fn));
});