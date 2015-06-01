/*
  # Machine

  State machine.

*/
'use strict'
const State = require('./State')

const Machine = function() {
  this.states = {}
}

module.exports = Machine

Machine.prototype.state = function(name, onEnter, onLeave) {
  let state = this.states[name]
  if (!state) {
    state = new State(name)
    this.states[name] = state
  }
  if (arguments.length > 1) {
    state.onEnter = onEnter
  }
  if (arguments.length > 2) {
    state.onLeave = onLeave
  }
  return state
}

