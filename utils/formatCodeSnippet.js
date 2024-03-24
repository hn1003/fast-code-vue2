(()=>{
  setScript('https://cdn.jsdelivr.net/npm/prettier@2.4.0/standalone.js')
  setScript('https://cdn.jsdelivr.net/npm/prettier@2.4.0/parser-babel.js')
})()

function setScript(url){
  let scriptElement = document.createElement('script');
  scriptElement.src = url;
  document.head.appendChild(scriptElement);
}

export default  function formatCodeSnippet(codeSnippet) {
  try{
    let res = prettier.format(codeSnippet, { parser: 'babel',plugins:[prettierPlugins.babel] });
    return res;
  }catch(err){
    window.alert('格式化失败！不支持格式化！')
    return codeSnippet
  }

}