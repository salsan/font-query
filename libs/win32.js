const {
  execSync
} = require('child_process');

function splitArr(arr, path) {
  if (arr !== undefined) {

    const fontArr = arr.split('\r\n');
    fontArr.pop();

    return (fontArr.map(item => {

      let arr = item.split('    REG_SZ    ');
      arr[1] = path + arr[1];
      arr[0] = arr[0].trim();

      return arr;
    }))

  } else return ([]);
}

function fontListQuery(regKey, fontName) {
  let listFont;

  try {
    listFont = execSync(regKey + '| findstr /c:' + '"' + fontName + '"', {
      stdio: 'pipe'
    }).toString();
  } catch (error) {
    console.error(error.message)
    return ([]);
  } finally {
    return listFont;
  }
}

function fontWin(fontName) {

  const regSystem = 'reg query "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts" /s';
  const regUser = 'reg query "HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts" /s';

  const listFontUser = splitArr(fontListQuery(regSystem, fontName), process.env.SystemRoot + '\\');
  const listFontSystem = splitArr(fontListQuery(regUser, fontName), '');

  return (listFontUser.concat(listFontSystem));


}

module.exports = {
  fontWin: fontWin
}
