const { fontWin, fontWinAsync } = require('./libs/win32.js')
const { fontLinux, fontLinuxAsync } = require('./libs/linux.js')

module.exports = function fontQuery (fontName) {
  if (fontName === undefined) {
    console.error('Variable is ' + fontName)
    process.exit(9)
  }

  switch (process.platform) {
    case 'win32':
      return fontWin(fontName)
    case 'linux':
      return fontLinux(fontName)
    default:
      console.error('Platform not supported: ' + process.platform)
      process.exit()
  }
}

module.exports.fontQueryAsync = async function (fontName) {
  if (fontName === undefined) {
    console.error('Variable is ' + fontName)
    process.exit(9)
  }

  switch (process.platform) {
    case 'win32':
      return await fontWinAsync(fontName)
    case 'linux':
      return await fontLinuxAsync(fontName)
    default:
      console.error('Platform not supported: ' + process.platform)
      process.exit()
  }
}
