#!/usr/bin/env node

'use strict'

const os = require('os')

const { fontQueryAsync } = require('../index.js')
const app = require('../package.json')

const argument = process.argv[2]

if (argument === undefined) {
  console.log(`${app.name} version ${app.version} ${os.EOL}`)
  process.exit(9)
}

const result = fontQueryAsync(argument.toLowerCase())

result.then(fonts => {
  fonts.forEach(font => {
    console.log(font)
  })
})
  .catch(err => {
    console.log(err)
  })
