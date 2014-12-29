Module('Shooter.States.Base', function(Base) {
  'use strict';

  /**
   * Initialize
   */
  Base.fn.initialize = function() {
    this.initialized = false;

    this.preload = [];
    this.create  = [];
    this.update  = [];
    this.render  = [];
  };


  /**
   * Add function to preload array
   * @param {Function} fn
   */
  Base.fn.addToPreload = function(fn) {
    if(this.preload === undefined) this.preload = [];

    this.preload.push(fn);
  };


  /**
   * Add function to create array
   * @param {Function} fn
   */
  Base.fn.addToCreate = function(fn) {
    if(this.create === undefined) this.create = [];
    this.create.push(fn);
  };


  /**
   * Add function to update array
   * @param {Function} fn
   */
  Base.fn.addToUpdate = function(fn) {
    if(this.update === undefined) this.update = [];
    this.update.push(fn);
  };


  /**
   * Add function to render array
   * @param {Function} fn
   */
  Base.fn.addToRender = function(fn) {
    if(this.render === undefined) this.render = [];
    this.render.push(fn);
  };


  /**
   * Run all functions inside initializers array
   * @return {void}
   */
  Base.fn.run = function(attrs) {
    if(this.initialized) {
      GAME.state.start(this.stateName);
      return;
    }

    var self = this, state, key, value;

    // add properties passed as parameter
    for(key in attrs) {
      value = attrs[key];
      this[key] = value;
    }

    // Create game main state
    state = {
      preload: function() {
        self.preload.forEach(function(fn){
          fn();
        });
      },

      create: function() {
        self.create.forEach(function(fn){
          fn();
        });
      },

      update: function() {
        self.update.forEach(function(fn){
          fn();
        });
      },

      render: function() {
        self.render.forEach(function(fn) {
          fn();
        });
      }
    };

    GAME.state.add(this.stateName, state);
    GAME.state.start(this.stateName);
  };

});