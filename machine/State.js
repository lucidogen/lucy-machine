/*
  # State

  A state in the state machine.

*/
'use strict'

const State = function(name) {
  this.name = name
  this.action = {}
}

State.prototype.on = function(event, callback) {
  this.action[event] = callback
  return this
}

const slice = Array.prototype.slice

State.prototype.receive = function(event) {
  let clbk = this.action[event]
  if (clbk) {
    let args = slice.call(arguments, 1)
    return clbk.apply(this, slice.call(arguments, 1))
  } else {
    return false
  }
}

module.exports = State
