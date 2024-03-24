const str = require('@only_you/fast-code/viewBuilder/buildView/buildApi/template')
const fs = require('fs')
const path = require('path')
function buildIndex({
  key,
  url
}, _path) {
  const text = str(url)
  fs.mkdir(path.join(..._path), () => {
    fs.writeFile(path.join(..._path, `api_${key}.js`), text, (res) => {
      console.log(res)
    })
  })
}
async function build(key, url, _path) {
  buildIndex({ key, url }, _path)
}

module.exports = build
