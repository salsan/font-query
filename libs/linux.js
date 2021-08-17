const {
  fontListQuery,
  splitQuery
} = require('./utils.js')

function splitArr(arr, path) {
  if (arr !== undefined) {

    return list = splitQuery(arr, '\n').map(
      item => {
        let arr = splitQuery(item, ':');
        return [arr[0].trim(), arr[1].trim()].reverse();
      })

  } else return [];
}

module.exports = function fontLinux(fontName) {

  const cmd = `fc-list`;
  const grep = `grep -i`;

  return (splitArr(fontListQuery(`${cmd} | ${grep} `, fontName), ''));

}
