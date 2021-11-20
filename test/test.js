const assert = require('assert')

const { fontQuery, fontQueryAsync } = require('../index.js')

describe('fontQueryAsync', function () {
  it('bal', function () {
    assert.ok(fontQueryAsync('bal'))
  })
  it('b', function () {
    assert.ok(fontQueryAsync('b'))
  })
  it('--v', function () {
    assert.ok(fontQueryAsync('--v'))
  })
})

describe('fontQuery', function () {
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
