const {
  fontListQuery,
  splitQuery,
  arrOrder
} = require('./utils.js')

function splitArr (arr, path) {
  let result

  try {
    if ((arr !== undefined) && (arr.lenght > 0)) {
      result = splitQuery(arr, '\n').map(
        item => {
          const arr = splitQuery(item, ':')
          //  return [arr[0].trim(), arr[1].trim()].reverse()
          return arrOrder(arr, path).reverse
        })
    } else result = []
  } catch (error) {
    console.error(error)
  } finally {
    result = result || []
  }
  return result
}

module.exports = function fontLinux (fontName) {
  const cmd = 'fc-list'
  const grep = 'grep -i'

  return (splitArr(fontListQuery(`${cmd} | ${grep} ${fontName}`), ''))
}
