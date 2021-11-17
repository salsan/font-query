const c2Array = require('c2array')
const {
  execSync
} = require('child_process')

function str2Array (data, Options) {
  return c2Array(data, Options)
}

function fontListQuery (cmd) {
  let listFont

  try {
    listFont = execSync(cmd, {
      stdio: 'pipe'
    }).toString()
  } catch (error) {
    console.error(error.message)
  } finally {
    listFont = listFont || ''
  }

  return listFont
}

function strFixType (arr, path) {
  return ([arr[0].trim(), path + arr[1].trim()])
}

module.exports = {
  fontListQuery: fontListQuery,
  strFixType: strFixType,
  str2Array: str2Array
}
