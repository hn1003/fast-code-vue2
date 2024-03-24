
//新的规范 =======================
const demoStr = `
 private String name; //角色 options[value1|参数1,value2|参数2] rules[isArray,isNumber,isTel,isEmail,isIdcard,required] types[add,edit,search,column]
 private String name1; //角色2 
 private String name2; //角色3 
 private String name3; //角色4
`

function disassembler(str){ //拆解出每一项
  const items = str.split(/\n/g).filter(item=>item.trim())
  return items
}

function itemStrToObj(tokens){
  return {
    key: getStrKey(tokens),
    label: getStrLabel(tokens),
    component: getStrComponent(tokens),
    rules: getStrRules(tokens),
    types: getStrTypes(tokens),
    options: getStrOptions(tokens)
  }
}

function sorter(map,options=[]){ //按类型分拣出要生成的部分
  return {
    
  }
}

console.log(disassembler(demoStr))