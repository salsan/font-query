const assert = require('assert')

const fontQuery = require('../index.js')

describe('Query', function () {
  it('bal', function () {
    assert.ok(fontQuery('bal'))
  })
  it('b', function () {
    assert.ok(fontQuery('b'))
  })
  it('--v', function () {
    assert.ok(fontQuery('--v'))
  })
})
