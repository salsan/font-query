const c2Array = require('c2array')
const {
  execFileSync,
  execFile
} = require('child_process')
const util = require('util')
const pexecFile = util.promisify(execFile)

function str2Array (data, Options) {
  return c2Array(data, Options)
}

function fontListQuery (cmd, args) {
  let listFont

  try {
    listFont = execFileSync(cmd, args).toString()
  } catch (error) {
    console.error(error.message)
  } finally {
    listFont = listFont || ''
  }

  return listFont
}

async function fontListQueryAsync (cmd, args) {
  let result
  try {
    result = await pexecFile(cmd, args)
  } catch (error) {
    result = error
  }

  if (Error[Symbol.hasInstance](result)) { return '' }

  const listFont = result.stdout

  return listFont.toString()
}

function strFixType (arr, path) {
  return ([arr[0].trim(), path + arr[1].trim()])
}

function fontFilter (fontName, fontList) {
  const result = []

  for (const item of fontList) {
    const font = item[0].toLowerCase()
    if (font.includes(fontName.toLowerCase())) {
      result.push(item)
    }
  }

  return result
}

module.exports = {
  fontListQuery: fontListQuery,
  fontListQueryAsync: fontListQueryAsync,
  strFixType: strFixType,
  str2Array: str2Array,
  fontFilter: fontFilter
}
