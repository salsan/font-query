const {
  fontListQuery,
  str2Array,
  strFixType,
  fontListQueryAsync
} = require('./utils.js')

function fontWin (fontName) {
  const reg = {
    sys: '"HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"',
    local: '"HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"'
  }

  const consoleStrSys = fontWinQuery(fontName, reg.sys)
  const consoleStrUser = fontWinQuery(fontName, reg.local)

  const fontUser = fontWinUser(consoleStrUser)
  const fontSys = fontWinSys(consoleStrSys)

  return fontUser.concat(fontSys)
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

function fontWinQuery (name, regKey) {
  const Options = {
    cmd: 'reg query',
    grep: 'findstr /I /c:'
  }

  return (
    fontListQuery(`${Options.cmd} ${regKey} /s | ${Options.grep}${name}`)
  )
}

async function fontWinAsync (fontName) {
  const reg = {
    sys: '"HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"',
    local: '"HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"'
  }

  const consoleStrSys = await fontWinQueryAsync(fontName, reg.sys)
  const consoleStrUser = await fontWinQueryAsync(fontName, reg.local)

  const fontUser = fontWinUser(consoleStrUser)
  const fontSys = fontWinSys(consoleStrSys)

  return fontUser.concat(fontSys)
}

async function fontWinQueryAsync (name, regKey) {
  const Options = {
    cmd: 'reg query',
    grep: 'findstr /I /c:'
  }

  return (
    await fontListQueryAsync(`${Options.cmd} ${regKey} /s | ${Options.grep}${name}`)
  )
}

module.exports = {
  fontWin: fontWin,
  fontWinAsync: fontWinAsync
}
