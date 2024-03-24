const dtoToTableColumns = require('@only_you/fast-code/viewBuilder/dtoToTableColumns')
const dtoToTableInputs = require('@only_you/fast-code/viewBuilder/dtoToTableInputs')
const str = require('@only_you/fast-code/viewBuilder/buildView/buildTable/template')
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
    if (item.options) {
      const enumsKey = item.key.toLocaleUpperCase() + '_ENUMS'
      const mapKey = item.key.toLocaleUpperCase() + '_MAP'
      reslut[enumsKey] = deepClone(item.options)
      reslut[mapKey] = enumsToMap(item.options)
      item.options = enumsKey
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
    fs.writeFile(path.join(..._path, `enum_${key}_table.js`), text, (res) => {
      console.log(res)
    })
  })
  return newOptions
}

function buildIndex({
  name,
  key,
  inputs,
  columns
}, _path) {
  const text = str(name, key, inputs, columns)
  fs.mkdir(path.join(..._path, key), () => {
    fs.writeFile(path.join(..._path, key, 'index.vue'), text, (res) => {
      console.log(res)
    })
  })
}

function build(name, key, dto, _path) {
  let options = dtoToTableInputs(dto)
  options = buildEnums({ key, options }, _path)
  const inputs = JSON.stringify(options)
  const columns = JSON.stringify(dtoToTableColumns(dto))
  buildIndex({ name, key, inputs, columns }, _path)
}
module.exports = build
