const {
  fontListQuery,
  str2Array,
  strFixType,
  fontListQueryAsync,
  fontFilter
} = require('./utils.js')

function fontWin (fontName) {
  const reg = {
    sys: '"HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"',
    local: '"HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"'
  }

  const consoleStrSys = fontWinQuery(reg.sys)
  const consoleStrUser = fontWinQuery(reg.local)

  const fontUser = fontWinUser(consoleStrUser)
  const fontSys = fontWinSys(consoleStrSys)

  const fontList = fontUser.concat(fontSys)

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
  const Options = {
    cmd: 'reg query'
  }

  return (
    fontListQuery(`${Options.cmd} ${regKey} /s`)
  )
}

async function fontWinAsync (fontName) {
  const reg = {
    sys: '"HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"',
    local: '"HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"'
  }

  const [consoleStrSys, consoleStrUser] = await Promise.all([
    fontWinQueryAsync(reg.sys),
    fontWinQueryAsync(reg.local)
  ])

  const fontUser = fontWinUser(consoleStrUser)
  const fontSys = fontWinSys(consoleStrSys)

  const fontList = fontUser.concat(fontSys)

  return fontFilter(fontName, fontList)
}

async function fontWinQueryAsync (regKey) {
  const Options = {
    cmd: 'reg query'
  }

  return await fontListQueryAsync(`${Options.cmd} ${regKey} /s`)
}

module.exports = {
  fontWin: fontWin,
  fontWinAsync: fontWinAsync
}
