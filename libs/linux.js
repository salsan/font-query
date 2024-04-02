const {
  fontListQuery,
  str2Array,
  fontListQueryAsync,
  fontFilter
} = require('./utils.js')

function fontLinux (fontName) {
  const cmd = 'fc-list'

  const consoleStr = fontListQuery(`${cmd}`)

  const fontsArray = fontLinArray(consoleStr)

  const fontList = fontFilter(fontName, fontsArray)

  return fontList
}

async function fontLinuxAsync (fontName) {
  const cmd = 'fc-list'

  const consoleStr = await fontListQueryAsync(`${cmd}`)

  const fontsArray = fontLinArray(consoleStr)

  const fontList = fontFilter(fontName, fontsArray)

  return fontList
}
function fontLinArray (str) {
  const arr = str2Array(str, {
    newline: true,
    removeEmpty: true, // remove empty array
    select: ':style=', // select only array which respect this word and delete if is not divisibile
    splitter: ': ' // split array in according with word choice
  })

  return arr.map(font => font.reverse())
}

module.exports = {
  fontLinux: fontLinux,
  fontLinuxAsync: fontLinuxAsync
}
