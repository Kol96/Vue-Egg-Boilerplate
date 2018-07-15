// 深度拷贝对象
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

// 获得字符串字符长度，中文2，英文1
export function getStrLength(str) {
  let realLength = 0
  let len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) realLength += 1
    else realLength += 2
  }
  return realLength
}

// 按字符截取字符串
export function cutStr(str, len) {
  let strLength = 0
  let strLen = 0
  let strCut = ''
  strLen = str.length
  for (var i = 0; i < strLen; i++) {
    let a = str.charAt(i)
    strLength++
    if (escape(a).length > 4) {
      // 中文字符的长度经编码之后大于4
      strLength++
    }
    if (strLength >= len) {
      return strCut
    }
    strCut = strCut.concat(a)
  }
  return str
}
