/**
 * Add mouse controls to play the game
 */
Module('Shooter.Game.Controls.Mouse', function(Mouse) {
  'use strict';

  Shooter.extend(Mouse.fn, Shooter.Game.Controls.Base.fn);

  /**
   * Initialize
   */
  Mouse.fn.initialize = function() {
    this.leftButton = GAME.input.activePointer;
  };


  /**
   * Move sideways
   */
  Mouse.fn.move = function() {
    if((GAME.input.x < GAME.width  - 20 && GAME.input.x > 20) ||
       (GAME.input.y < GAME.height - 20 && GAME.input.y > 20))
    {
      EventBus.dispatch('mouse-moved', Mouse.fn, GAME.input.x, GAME.input.y);
    }
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Mouse.fn.update = function() {
    this.move();

    if(this.leftButton.isDown) {
      EventBus.dispatch(this.getFireButtonEvent(), Mouse.fn);
    }
  };

  // ########################################################################################
  // ########################################################################################

  Shooter.States.Game.fn.addToCreate(Mouse.fn.create.bind(Mouse.fn));
  Shooter.States.Game.fn.addToUpdate(Mouse.fn.update.bind(Mouse.fn));
});