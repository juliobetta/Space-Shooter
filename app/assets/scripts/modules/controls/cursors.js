/**
 * Add Cursors controls to play the game
 */
Module('Shooter.Controls.Cursors', function(Cursors) {
  'use strict';

  /**
   * Dispatch cursor event
   */
  Cursors.fn.dispatchCursorEvent = function(direction) {
    var acceleration = direction === LEFT || direction === UP ? -ACCELERATION : ACCELERATION,
        coordinate   = direction === LEFT || direction === RIGHT ? 'x' : 'y';

    EventBus.dispatch('cursorkey-pressed', Cursors.fn, coordinate, acceleration);
  };


  /**
   * ########################################################################################
   * Initializer ############################################################################
   * ########################################################################################
  */

  Cursors.fn.initialize = function() {
    this.cursors = GAME.input.keyboard.createCursorKeys();
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Cursors.fn.create = function() {
    this.initialize();
  };


  Cursors.fn.update = function() {
    EventBus.dispatch('before-cursorkey-pressed', Cursors.fn);

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


  Shooter.Application.addToCreate(Cursors.fn.create.bind(Cursors.fn));
  Shooter.Application.addToUpdate(Cursors.fn.update.bind(Cursors.fn));

});