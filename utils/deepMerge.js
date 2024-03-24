// JS对象深度合并
 function deepMerge(target = {}, source = {}) {
  target = deepClone(target);//深度克隆
  if (typeof target !== 'object' || typeof source !== 'object') return false;//判断类型
  for (var prop in source) {
      if (!source.hasOwnProperty(prop)) continue; //检测属性是否为对象的自有属性
      if (prop in target) { //prop 中是否有 target 属性
          if (typeof target[prop] !== 'object') {
              target[prop] = source[prop];
          } else {
              if (typeof source[prop] !== 'object') {
                  target[prop] = source[prop];
              } else {
                  if (target[prop].concat && source[prop].concat) {
                      target[prop] = target[prop].concat(source[prop]); //合并
                  } else {
                      target[prop] = deepMerge(target[prop], source[prop]);//递归
                  }
              }
          }
      } else {
          target[prop] = source[prop];
      }
  }
  return target;
}


// 深度克隆
function deepClone (obj) {
  // 对常见的“非”值，直接返回原来值
  if([null, undefined, NaN, false].includes(obj)) return obj;
  if(typeof obj !== "object" && typeof obj !== 'function') {
      //原始类型直接返回
      return obj;
  }
  var o = isArray(obj) ? [] : {};
  for(let i in obj) {
      if(obj.hasOwnProperty(i)){
          o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
  }
  return o;
}

function isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
