/*
  # Machine

  State machine.

*/
'use strict'
const State = require('./State')

const Machine = function() {
  let self = this
  self.states = {}
  self.state = function(name, onEnter, onLeave) {
    return self.state_(name, onEnter, onLeave)
  }
}

module.exports = Machine

Machine.prototype.state_ = function(name, onEnter, onLeave) {
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

