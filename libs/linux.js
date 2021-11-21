const {
  fontListQuery,
  str2Array,
  fontListQueryAsync
} = require('./utils.js')

function fontLinux (fontName) {
  const cmd = 'fc-list'
  const grep = 'grep -i'

  const consoleStr = fontListQuery(`${cmd} | ${grep} ${fontName}`)

  return fontLinArray(consoleStr)
}

async function fontLinuxAsync (fontName) {
  const cmd = 'fc-list'
  const grep = 'grep -i'

  const consoleStr = await fontListQueryAsync(`${cmd} | ${grep} ${fontName}`)

  return fontLinArray(consoleStr)
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
