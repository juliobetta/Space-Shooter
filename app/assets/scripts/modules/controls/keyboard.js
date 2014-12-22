/**
 * Add Keyboard controls to play the game
 */
Module('Shooter.Controls.Keyboard', function(Keyboard) {
  'use strict';

  var LEFT  = 'left',
      RIGHT = 'right',
      UP    = 'up',
      DOWN  = 'down';

  var fireButtonEvt = 'firebutton-hit';


  /**
   * Dispatch cursor event
   */
  Keyboard.fn.dispatchCursorEvent = function(direction) {
    var acceleration = direction === LEFT || direction === UP ? -ACCELERATION : ACCELERATION,
        coordinate   = direction === LEFT || direction === RIGHT ? 'x' : 'y';

    EventBus.dispatch('cursorkey-pressed', Keyboard.fn, coordinate, acceleration);
  };


  /**
   * ########################################################################################
   * Initializer ############################################################################
   * ########################################################################################
  */

  Keyboard.fn.initialize = function() {
    this.cursors    = GAME.input.keyboard.createCursorKeys();
    this.fireButton = GAME.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  };


  /**
   * ########################################################################################
   * Event Listeners ########################################################################
   * ########################################################################################
  */

  Keyboard.fn.bindEvents = function() {
    EventBus.addEventListener('ship-destroyed', function() { fireButtonEvt = 'restart-hit'; });
    EventBus.addEventListener('ship-revived', function() { fireButtonEvt = 'firebutton-hit';});
  };


  /**
   * ########################################################################################
   * Main states ############################################################################
   * ########################################################################################
  */

  Keyboard.fn.create = function() {
    this.initialize();
    this.bindEvents();
  };


  Keyboard.fn.update = function() {
    EventBus.dispatch('before-key-pressed', Keyboard.fn);

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

    if(this.fireButton.isDown) {
      EventBus.dispatch(fireButtonEvt, Keyboard.fn);
    }
  };

  // ########################################################################################
  // ########################################################################################


  Shooter.Application.addToCreate(Keyboard.fn.create.bind(Keyboard.fn));
  Shooter.Application.addToUpdate(Keyboard.fn.update.bind(Keyboard.fn));
});