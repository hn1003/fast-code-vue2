const dtoToForm = require('@only_you/fast-code/viewBuilder/dtoToForm')
const dtoToFormRules = require('@only_you/fast-code/viewBuilder/dtoToFormRules')
const str = require('@only_you/fast-code/viewBuilder/buildView/buildFormDialog/template')
const fs = require('fs')
const path = require('path')

function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
function enumsToMap(enums, key = 'label', value = 'value') {
  const map = {}
  enums.forEach(item => {
    map[item[key]] = item[value]
    map[item[value]] = item[key]
  })
  return map
}

function buildEnums({
  key,
  options
}, _path) {
  const reslut = {}
  const newOptions = options.map(item => {
    if (item.data) {
      const enumsKey = item.key.toLocaleUpperCase() + '_ENUMS'
      const mapKey = item.key.toLocaleUpperCase() + '_MAP'
      reslut[enumsKey] = deepClone(item.data)
      reslut[mapKey] = enumsToMap(item.data)
      item.data = enumsKey
    }
    return item
  })
  let text = ''
  for (const k in reslut) {
    text += 'const ' + k + '=' + JSON.stringify(reslut[k]) + '\n'
  }
  text += `
   export {
     ${Object.keys(reslut).toString().replace(',', ',\n')}
   }
  `
  fs.mkdir(path.join(..._path), () => {
    fs.writeFile(path.join(..._path, `enum_${key}_form.js`), text, (res) => {
      console.log(res)
    })
  })
  return newOptions
}

function buildIndex({
  name,
  key,
  options,
  rules
}, _path) {
  const text = str(name, key, options, rules)
  fs.mkdir(path.join(..._path, key), () => {
    fs.mkdir(path.join(..._path, key, 'dialog'), () => {
      fs.writeFile(path.join(..._path, key, 'dialog', `${key}Dialog.vue`), text, (res) => {
        console.log(res)
      })
    })
  })
}
async function build(name, key, dto, _path) {
  let options = dtoToForm(dto)
  options = buildEnums({ key, options }, _path)
  options = JSON.stringify(options)
  const rules = JSON.stringify(dtoToFormRules(dto))
  buildIndex({ name, key, options, rules }, _path)
}

module.exports = build

