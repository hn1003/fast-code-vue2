function dtoToForm(str) {
  const res = str.replace(/private/g, '').split(/[\r\n]+/).filter(item => item.trim())
  const d = res.map(item => {
    const key = item.match(/[\s](\S*);/)[1].trim()
    const label = item.match(/\/\/(\S*)/)
    const enums = item.match(/--([\S\s]*)/) ? item.match(/--([\S\s]*)/)[1].split(' ').filter(item => item).map(item => {
      const arr = item.split(',')
      return {
        label: arr[1],
        value: arr[0]
      }
    }) : []
    const component = comType(item)
    const re = {
      component: enums.length ? 'select' : component,
      key: key,
      label: label ? label[1] : ''
    }
    if (enums.length) {
      re.data = enums
    }
    return re
  })

  function comType(item) {
    if (item.includes('String')) return 'input'
    if (item.includes('Date')) return 'RangDate'
    return 'other'
  }
  return d
}

module.exports = dtoToForm
