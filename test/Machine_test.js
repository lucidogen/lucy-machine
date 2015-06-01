'use strict'

require('chai').should()
const Machine = require('../machine/Machine')

describe('Machine', function() {
  let machine = new Machine
  let state   = machine.state
  describe('#state', function() {
    it('should be a function', function() {
      state.should.be.a('function')
    })

    it('should create State objects', function() {
      let s = state('foo')
      s.should.be.an.instanceof(State)
    })
  }) // #state

  describe('#receive', function() {
    it('should update machine with event', function() {
    })
  }) // #receive
}) // Machine

