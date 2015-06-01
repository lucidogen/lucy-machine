/*
  # Machine

  State machine.

*/
'use strict'
const State = require('./State')

const Machine = function() {
  this.states = {}
  this.current = null
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

Machine.prototype.enterState = function(state) {
  if (this.current) this.current.leave()
  this.current = state
  this.current.enter()
}

Machine.prototype.enter = function(name) {
  let state = this.states[name]
  if (!state) {
    throw new Error(`Unknown state '${name}'.`)
  }
  this.enterState(state)
}

Machine.prototype.receive = function(event) {
  let current = this.current
  if (!current) {
    // TODO: Search in default state
  } else {
    let ret = current.receive.apply(this, arguments)
    if (ret == false) {
      // current state does not handle this event
      // TODO: try in default state
    } else if (ret) {
      // state change
      this.enterState(ret)
    }
  }
}
