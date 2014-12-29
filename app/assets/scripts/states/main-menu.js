Module('Shooter.States.MainMenu', function(MainMenu) {
  'use strict';

  Shooter.extend(MainMenu.fn, Shooter.States.Base.fn);

  /**
   * Initialize
   */
  MainMenu.fn.initialize = function() {
    this.super.initialize();
    this.stateName = 'main-menu';
  };

  MainMenu.fn.initialize();
});