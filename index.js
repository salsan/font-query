const { fontWin, fontWinAsync } = require('./libs/win32.js')
const { fontLinux, fontLinuxAsync } = require('./libs/linux.js')

function fontQuery (fontName) {
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
      process.exit()
  }
}

async function fontQueryAsync (fontName) {
  if (fontName === undefined) {
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

module.exports = {
  fontQuery: fontQuery,
  fontQueryAsync: fontQueryAsync
}
