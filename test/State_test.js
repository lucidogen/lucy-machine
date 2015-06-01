'use strict'

require('chai').should()
const State = require('../machine/State')

describe('State', function() {
  let s = new State('foo')
  describe('#name', function() {
    it('should return state name', function() {
      s.name.should.equal('foo')
    })
  }) // #name

  describe('#on', function() {
    it('should return state', function() {
      s.on('B', function() {}).should.equal(s)
    })

    it('should set action', function() {
      let fun = function() {}
      s.on('B', fun)
      s.action.B.should.equal(fun)
    })
  }) // #on

  describe('#receive', function() {
    it('should trigger action', function() {
      let value
      let ret_value = {}
      s.on('B', function(v) {
        value = v
        return ret_value
      })
      let r = Math.random()
      s.receive('B', r).should.equal(ret_value)
      value.should.equal(r)
    })

    it('should return false on unknown event', function() {
      s.receive('missing').should.equal.false
    })
  }) // #receive
}) // State

