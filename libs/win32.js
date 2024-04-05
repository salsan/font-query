const {
  fontListQuery,
  str2Array,
  strFixType,
  fontListQueryAsync,
  fontFilter
} = require('./utils.js')

function fontWin (fontName) {
  const reg = {
    sys: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts',
    local: 'HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts'
  }

  const consoleStrSys = fontWinQuery(reg.sys)
  const consoleStrUser = fontWinQuery(reg.local)

  const fontList = fontWinMerge(consoleStrUser, consoleStrSys)

  return fontFilter(fontName, fontList)
}

function fontWinArray (str, path) {
  const option = {
    newline: true,
    removeEmpty: true,
    select: '    REG_SZ    ',
    splitter: '    REG_SZ    '
  }
  const arr = str2Array(str, option)

  return arr.map(font => {
    return strFixType(font, path)
  })
}

function fontWinUser (str) {
  const path = ''
  return fontWinArray(str, path)
}

function fontWinSys (str) {
  const path = process.env.SystemRoot + '\\fonts\\'
  return fontWinArray(str, path)
}

function fontWinQuery (regKey) {
  const options = ['query', regKey, '/s']

  return fontListQuery('reg', options)
}

async function fontWinAsync (fontName) {
  const reg = {
    sys: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts',
    local: 'HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts'
  }

  const [consoleStrSys, consoleStrUser] = await Promise.all([
    fontWinQueryAsync(reg.sys),
    fontWinQueryAsync(reg.local)
  ])

  const fontList = fontWinMerge(consoleStrUser, consoleStrSys)

  return fontFilter(fontName, fontList)
}

async function fontWinQueryAsync (regKey) {
  const options = ['query', regKey, '/s']

  return await fontListQueryAsync('reg', options)
}

function fontWinMerge (local, sys) {
  const fontUser = fontWinUser(local)
  const fontSys = fontWinSys(sys)

  const fontList = fontUser.concat(fontSys)

  return fontList
}

module.exports = {
  fontWin: fontWin,
  fontWinAsync: fontWinAsync
}
