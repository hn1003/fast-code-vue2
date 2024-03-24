export default function objectComponentToResult(config){
  let result = ''
  for(const key in config){
    let content = typeof config[key].content === 'string' ? 
    JSON.stringify(config[key].content || '').toString()
    :
   JSON.stringify( JSON.stringify(config[key].content || '' ).toString() )

    const item = `${JSON.stringify(key)}:${ config[key].prefix ? (config[key].prefix+':') : '' }${content},
    `
    result+=item
  }
  return `{
    ${result.trim().replace(/,$/, '')}
  }`
}