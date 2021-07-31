const fontWin = require('./libs/win32.js');

function fontQuery(fontName) {

  if (fontName === undefined) {
    console.error('Variable is ' + fontName);
    process.exit(9);
  }

  if (process.platform === 'win32') return fontWin(fontName);
  else {
    console.error('Platform not supported: ' + process.platform);
    process.exit();
  }

}

module.exports = {
  fontQuery: fontQuery
}
