'use strict'

require('chai').should()
const Machine = require('../machine/Machine')

describe('lucy-machine', function() {
  let m = require('../index')
  it('should return Machine', function() {
    m.should.equal(Machine)
  })
})
