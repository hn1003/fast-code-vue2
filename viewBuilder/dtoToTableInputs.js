const tag = 'SEARCH'

function dtoToTableInputs(str) {
  const res = str.replace(/private/g, '').split(/[\r\n]+/).filter(item => item)
  const d = res.map(item => {
    if (item.includes(tag)) {
      const enums = item.match(/--([\S\s]*)/) ? item.match(/--([\S\s]*)/)[1].split(' ').filter(item => item).map(item => {
        const arr = item.split(',')
        return {
          label: arr[1],
          value: arr[0]
        }
      }) : []
      const key = item.match(/[\s](\S*);/)[1].trim()
      const label = item.match(/\/\/(\S*)/)
      const re = {
        type: enums.length ? 'select' : 'input',
        key: key,
        name: label ? label[1] : '',
        hasLabel: true
      }
      if (enums.length) {
        re.options = enums
      }
      return re
    }
  }).filter(item => item)
  console.log(d)
  return d
}

module.exports = dtoToTableInputs
exports = {
  tag
}
