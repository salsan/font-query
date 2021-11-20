const {
  fontListQuery,
  str2Array,
  fontListQueryAsync
} = require('./utils.js')

module.exports = function fontLinux (fontName) {
  const cmd = 'fc-list'
  const grep = 'grep -i'

  const consoleStr = fontListQuery(`${cmd} | ${grep} ${fontName}`)

  const listFonts = str2Array(consoleStr, {
    newline: true,
    removeEmpty: true, // remove empty array
    select: ':style=', // select only array which respect this word and delete if is not divisibile
    splitter: ': ' // split array in according with word choice
  })

  return listFonts.map(font => font.reverse())
}

module.exports.fontLinuxAsync = async (fontName) => {
  const cmd = 'fc-list'
  const grep = 'grep -i'

  const consoleStr = await fontListQueryAsync(`${cmd} | ${grep} ${fontName}`)

  const listFonts = str2Array(consoleStr, {
    newline: true,
    removeEmpty: true, // remove empty array
    select: ':style=', // select only array which respect this word and delete if is not divisibile
    splitter: ': ' // split array in according with word choice
  })

  return listFonts.map(font => font.reverse())
}
