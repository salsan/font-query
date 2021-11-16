const {
  fontListQuery,
  addPath,
  str2Array,
  arrTrim
} = require('./utils.js')

module.exports = function fontWin (fontName) {
  const reg = [
    ['"HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"',
      process.env.SystemRoot + '\\fonts\\'
    ],
    ['"HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"',
      ''
    ]
  ]

  const cmd = 'reg query'
  const grep = 'findstr /I /c:'

  const consoleStrSys = fontListQuery(`${cmd} ${reg[0][0]} /s | ${grep}${fontName}`)
  const consoleStrUser = fontListQuery(`${cmd} ${reg[1][0]} /s | ${grep}${fontName}`)
  const OptionsConfigWin32 = {
    newline: true,
    removeEmpty: true,
    select: '    REG_SZ    ',
    splitter: '    REG_SZ    '
  }

  let fontUser = str2Array(consoleStrUser, OptionsConfigWin32)

  fontUser = fontUser.map(font => {
    return arrTrim(font)
  })

  let fontSys = str2Array(consoleStrSys, OptionsConfigWin32)

  fontSys = fontSys.map(font => {
    return addPath(font, process.env.SystemRoot + '\\fonts\\')
  })

  if (fontSys.length > 0 && fontUser.length > 0) { return fontUser.concat(fontSys) }
  if (fontSys.length > 0) return fontSys
  if (fontUser.length > 0) return fontUser

  return []
}
