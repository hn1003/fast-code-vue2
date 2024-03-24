function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}


/****
 * @param {string} key - 上传到后端的key.
 * @param {string} label - 提示标题.
 * @param { Object | Array } options - 输入框类型.
 * @param { boolean } hasPrefix - 是否有前缀，默认false.
 * @param { string } type - 输入框类型 string | array | 'form',默认string.
 */
export default function configCompoentBuilder(
  key,
  label,
  options,
  hasPrefix = false,
  type = 'string'
) {
  if (!isArray(options)) { //参数归一化
    options = [options]
  }

  return {
    type: 'form',
    key: key,
    label: label,
    noSubmit: true,
    form: {
      colNum: 1,
      labelPosition: 'left',
      props: {
        labelWidth: !hasPrefix || type === 'string' ? '0px' : undefined
      }
    },
    options: [
      {
        component: "input",
        key: 'prefix',
        label: '前缀',
        isHide: () => { return !hasPrefix }
      },
      (() => {
        if (type === 'array') {
          return {
            type: 'list',
            key: 'content',
            dynamicProps: {
              type: options[0].type === 'form' ? 'Object' : ( options[0].type === 'list' ? 'Array' : 'String' ) 
            },
            item: options[0],
            label: !hasPrefix ? '' : '内容',
          }
        }
        if (type === 'form') {
          return {
            type: 'form',
            key: 'content',
            label: !hasPrefix ? '' : '内容',
            noSubmit: true,
            form: {
              colNum: 1,
              labelPosition: 'left',
            },
            options: options
          }
        }
        if (type === 'string') {
          options[0].key = 'content'
          options[0].label = !hasPrefix && type === 'string' ? '' : '内容'
          return options[0]
        }
      })(),
    ]

  }

}