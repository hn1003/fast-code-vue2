
function dtoToTableColumns(str) {
  const res = str.replace(/private/g, '').split(/[\r\n]+/).filter(item => item)
  const d = res.map(item => {
    const key = item.match(/[\s](\S*);/)[1].trim()
    const label = item.match(/\/\/(\S*)/)
    return {
      key: key,
      label: label ? label[1] : ''
    }
  })
  console.log(d)
  return d
}

module.exports = dtoToTableColumns
