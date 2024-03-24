const tag = 'REQUIRED'

function dtoToFormRules(str) {
  const reslut = {}
  const res = str.replace(/private/g, '').split(/[\r\n]+/).filter(item => item)
  res.map(item => {
    if (item.includes(tag)) {
      const key = item.match(/[\s](\S*);/)[1].trim()
      const label = item.match(/\/\/(\S*)/)
      return { [key]: [{
        required: true,
        message: `请填写${label ? label[1] : ''}`,
        trigger: ['change', 'blur']
      }] }
    } else {
      return undefined
    }
  }).filter(item => item).forEach((item) => {
    const key = Object.keys(item)[0]
    reslut[key] = item[key]
  })
  console.log(reslut)
  return reslut
}
dtoToFormRules(str)
module.exports = dtoToFormRules
