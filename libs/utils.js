const {
  execSync
} = require('child_process')

function fontListQuery (cmd) {
  let listFont = []

  try {
    listFont = execSync(cmd, {
      stdio: 'pipe'
    }).toString()

    return listFont
  } catch (error) {
    console.error(error.message)
    return []
  }
}

function splitQuery (query, separator) {
  const fontArr = query.split(separator)
  if (query[query.length - 1].trim() === '') { fontArr.pop() }
  return fontArr
}

module.exports = {
  fontListQuery: fontListQuery,
  splitQuery: splitQuery
}
