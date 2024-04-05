const assert = require('assert')

const { fontQuery, fontQueryAsync } = require('../index.js')

describe('fontQueryAsync()', function () {
  it('All fonts', async function () {
    const fonts = await fontQueryAsync(' ')
    assert.ok(fonts.length > 0)
  })
})

describe('fontQuery()', function () {
  it('All fonts', function () {
    const fonts = fontQuery(' ')
    assert.ok(fonts.length > 0)
  })
})
