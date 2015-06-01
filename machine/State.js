/*
  # State

  A state in the state machine.

*/
'use strict'

const State = function(name, onEnter, onLeave) {
  this.name = name
  this.action  = {}
  this.sub     = {}
  this.current = this
  // Set by state.Machine
  this.onEnter = onEnter
  this.onLeave = onLeave
}

State.prototype.on = function(event, callback) {
  this.action[event] = callback
  return this
}

State.prototype.when = function(event) {
  if (this.parent) return this.parent.when(event)

  let sub = this.sub[event]
  if (!sub) {
    sub = new State(this.name + '.' + event)
    this.sub[event] = sub
    sub.parent = this
    sub.back   = event
  }
  return sub
}

State.prototype.enter = function() {
  if (this.onEnter) {
    this.onEnter()
  }
}

State.prototype.leave = function() {
  if (this.onLeave) {
    this.onLeave()
  }
}

const slice = Array.prototype.slice

State.prototype.receive = function(event, value) {
  let current = this.current

  if (current.back == event) {
    if (!value) {
      // move back
      // we do not trigger 'leave' or 'enter' for pseudo-states
      this.current = this
    }
    return
  }

  let sub = current.sub[event]
  if (sub) {
    // entering 'when' pseudo-state
    this.current = sub
    // we do not trigger 'leave' or 'enter' for pseudo-states
    return
  }

  let clbk = current.action[event]
  if (clbk) {
    let args = slice.call(arguments, 1)
    return clbk.apply(current, slice.call(arguments, 1))
  } else {
    return false
  }
}

module.exports = State
