const {
  fontListQuery,
  splitQuery
} = require('./utils.js')

function splitArr(arr, path) {
  if (arr !== undefined) {

    return list = splitQuery(arr, '\r\n').map(
      item => {
        let font = splitQuery(item, '    REG_SZ    ');
        return [font[0].trim(), path + font[1].trim()];
      })

  } else return [];
}

module.exports = function fontWin(fontName) {

  const reg = [
    ['"HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"',
      process.env.SystemRoot + '\\fonts\\'
    ],
    ['"HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"',
      ""
    ]
  ]

  const cmd = `reg query`;
  const grep = `findstr /I /c:`;
  const exclude = `findstr /v "HKEY_`;

  const fontUser = splitArr(fontListQuery(`${cmd} ${reg[0][0]} /s | ${grep}${fontName} | ${exclude}`),
    `${reg[0][1]}`);
  const fontSys = splitArr(fontListQuery(`${cmd} ${reg[1][0]} /s | ${grep}${fontName} | ${exclude}`),
    `${reg[1][1]}`);

  return (fontUser.concat(fontSys));

}
