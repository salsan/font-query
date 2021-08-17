const fontWin = require('./libs/win32.js');
const fontLinux = require('./libs/linux.js');

module.exports = function fontQuery(fontName) {

  if (fontName === undefined) {
    console.error('Variable is ' + fontName);
    process.exit(9);
  }

  switch(process.platform){
    case 'win32' :
       return fontWin(fontName);
       break;
    case 'linux' :
      return fontLinux(fontName);
      break;
    default:
      console.error('Platform not supported: ' + process.platform);
      process.exit();
  }

}
