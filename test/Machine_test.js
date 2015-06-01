'use strict'

require('chai').should()
const Machine = require('../machine/Machine')
const State   = require('../machine/State')

describe('Machine', function() {
  let m = new Machine
  describe('#state', function() {
    let foo
    it('should create State objects', function() {
      m.state('foo').should.be.an.instanceof(State)
    })

    it('should return same object on same name', function() {
      let foo = m.state('foo')
      m.state('foo').should.equal(foo)
    })
  }) // #state

  describe('#receive', function() {
    it('should update machine with event', function() {
    })
  }) // #receive
}) // Machine

