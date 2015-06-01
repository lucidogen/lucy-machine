'use strict'

require('chai').should()
const State = require('../machine/State')

describe('State', function() {
  let s
  before(function() {
    s = new State('foo')
  })

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

  describe('#when', function() {
    it('should return pseudo-state', function() {
      let sc = s.when('C')
      sc.should.be.an.instanceof(State)
      sc.should.not.equal(s)
      sc.should.equal(s.when('C'))
      sc.should.not.equal(s.when('D'))
    })

    it('on pseudo-state should return parent pseudo-state', function() {
      s.when('C').when('D').should.equal(s.when('D'))
    })
  })

  describe('#enter', function() {
    it('should trigger onEnter', function() {
      let value = false
      let s = new State('foo', function() {
        value = 'enter.foo'
      })
      value.should.be.false
      s.enter()
      value.should.equal('enter.foo')
    })
  })

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

    it('should trigger action and when', function() {
      let values = []
      let ret_value = {}
      s
        .on('B', function(v) {
            values.push('on.B')
          })
        .when('C')
          .on('B', function() {
              values.push('when.C.B')
            })
      s.receive('B')
      s.receive('C', 1)
      s.receive('B')
      s.receive('C', 0)
      s.receive('B')
      values.should.deep.equal(
        [ 'on.B'
        , 'when.C.B'
        , 'on.B'
        ]
      )
    })
  }) // #receive
}) // State

