/**
 * Add Controls to play the game
 */
Module('Shooter.Controls', function(Controls) {
  'use strict';

  /**
   * Dispatch cursor event
   */
  Controls.fn.dispatchCursorEvent = function(direction) {
    var acceleration = direction === LEFT || direction === UP ? -ACCELERATION : ACCELERATION,
        coordinate   = direction === LEFT || direction === RIGHT ? 'x' : 'y';

    EventBus.dispatch('cursorkey-pressed', Controls.fn, coordinate, acceleration);
  };


  /**
   * ########################################################################################
   * Initializer ############################################################################
   * ########################################################################################
  */

  Controls.fn.initialize = function() {
    this.cursors = GAME.input.keyboard.createCursorKeys();
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Controls.fn.create = function() {
    this.initialize();
  };


  Controls.fn.update = function() {
    EventBus.dispatch('before-cursorkey-pressed', Controls.fn);

    if(this.cursors.left.isDown) {
      this.dispatchCursorEvent(LEFT);
    } else if(this.cursors.right.isDown) {
      this.dispatchCursorEvent(RIGHT);
    }

    if(this.cursors.up.isDown) {
      this.dispatchCursorEvent(UP);
    } else if(this.cursors.down.isDown) {
      this.dispatchCursorEvent(DOWN);
    }
  };

  // ########################################################################################
  // ########################################################################################


  Shooter.Application.addToCreate(Controls.fn.create.bind(Controls.fn));
  Shooter.Application.addToUpdate(Controls.fn.update.bind(Controls.fn));

});