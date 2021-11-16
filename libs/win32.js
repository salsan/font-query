const {
  fontListQuery,
  addPath,
  str2Array,
  arrTrim
} = require('./utils.js')

module.exports = function fontWin (fontName) {
  const Reg = {
    sys: '"HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"',
    local: '"HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"'
  }

  const OptionsQueryFonts = {
    cmd: 'reg query',
    grep: 'findstr /I /c:'
  }

  const OptionsConfigWin32 = {
    newline: true,
    removeEmpty: true,
    select: '    REG_SZ    ',
    splitter: '    REG_SZ    '
  }

  const consoleStrSys = fontWinQuery(OptionsQueryFonts, fontName, Reg.sys)
  const consoleStrUser = fontWinQuery(OptionsQueryFonts, fontName, Reg.local)

  const fontUser = fontWinUser(consoleStrUser, OptionsConfigWin32)
  const fontSys = fontWinSys(consoleStrSys, OptionsConfigWin32)

  return fontUser.concat(fontSys)
}

function fontWinUser (str, Options) {
  const user = str2Array(str, Options)

  return user.map(font => {
    return arrTrim(font)
  })
}

function fontWinSys (str, Options) {
  const sys = str2Array(str, Options)

  return sys.map(font => {
    return addPath(font, process.env.SystemRoot + '\\fonts\\')
  })
}

function fontWinQuery (Options, name, regKey) {
  return (
    fontListQuery(`${Options.cmd} ${regKey} /s | ${Options.grep}${name}`)
  )
}
