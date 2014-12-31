Module('Shooter.States.Base', function(Base) {
  'use strict';

  /**
   * Initialize
   */
  Base.fn.initialize = function() {
    this.initialized = false;

    this._preload = [];
    this._create  = [];
    this._update  = [];
    this._render  = [];
  };


  /**
   * Add function to preload array
   * @param {Function} fn
   */
  Base.fn.addToPreload = function(fn) {
    if(this._preload === undefined) this._preload = [];

    this._preload.push(fn);
  };


  /**
   * Add function to create array
   * @param {Function} fn
   */
  Base.fn.addToCreate = function(fn) {
    if(this._create === undefined) this._create = [];
    this._create.push(fn);
  };


  /**
   * Add function to update array
   * @param {Function} fn
   */
  Base.fn.addToUpdate = function(fn) {
    if(this._update === undefined) this._update = [];
    this._update.push(fn);
  };


  /**
   * Add function to render array
   * @param {Function} fn
   */
  Base.fn.addToRender = function(fn) {
    if(this._render === undefined) this._render = [];
    this._render.push(fn);
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
        self._preload.forEach(function(fn){
          fn();
        });
      },

      create: function() {
        self._create.forEach(function(fn){
          fn();
        });
      },

      update: function() {
        self._update.forEach(function(fn){
          fn();
        });
      },

      render: function() {
        self._render.forEach(function(fn) {
          fn();
        });
      }
    };

    GAME.state.add(this.stateName, state);
    GAME.state.start(this.stateName);
  };

});