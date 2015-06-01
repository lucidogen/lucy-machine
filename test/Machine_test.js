'use strict'

require('chai').should()
const Machine = require('../machine/Machine')
const State   = require('../machine/State')

describe('Machine', function() {
  let m
  before(function() {
    m = new Machine
  })

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

  describe('#enter', function() {
    it('should enter state', function(done) {
      m.state('foo', function() {
        true.should.be.true
        done()
      })
      m.enter('foo')
    })
  })

  describe('#receive', function() {
    it('BB should update machine with event', function() {
      let values = []
      m.state('foo', function() {
          values.push('foo.enter')
        })
        .on('B', function() {
          values.push('foo.B')
        })
        .on('C', function() {
          values.push('foo.C')
          return m.state('bar')
        })
      m.state('bar', function() {
          values.push('bar.enter')
        })
        .on('B', function() {
          values.push('bar.B')
        })
      m.enter('foo')
      m.receive('B')
      m.receive('C')
      m.receive('B')

      values.should.deep.equal(
        [ 'foo.enter'
        , 'foo.B'
        , 'foo.C'
        , 'bar.enter'
        , 'bar.B'
        ]
      )
    })
  }) // #receive
}) // Machine

