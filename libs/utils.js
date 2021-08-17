const {
  execSync
} = require('child_process');

function fontListQuery(cmd, fontName) {
  let listFont;

  try {
    listFont = execSync(cmd + '"' + fontName + '"', {
      stdio: 'pipe'
    }).toString();
  } catch (error) {
    console.error(error.message)
    return [];
  } finally {
    return listFont;
  }
}

function splitQuery ( query, separator ){
      const fontArr = query.split(separator);
      if (query[query.length-1].trim() === '')
          fontArr.pop();
      return fontArr;
}

module.exports = {
  fontListQuery: fontListQuery,
  splitQuery: splitQuery
}
