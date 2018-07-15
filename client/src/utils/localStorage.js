/**
 * 判断localStorage是否支持 考虑隐身模式下localstorage存在但无法调用方法
 * @returns {boolean}
 */
function testLocalStorage() {
  const storage = window.localStorage
  if (!storage) {
    return false
  }
  try {
    storage.setItem('test', '1')
    storage.removeItem('test')
    return true
  } catch (e) {
    return false
  }
}

const isLocalStorageSupported = testLocalStorage()

/**
 * 设置localStorage
 * @param key
 * @param value
 */
export function set(key, value) {
  window.localStorage.setItem(key, value)
}

/**
 * 获取localStorage
 * @param key
 */
export function get(key) {
  return window.localStorage.getItem(key)
}

/**
 * 删除localStorage
 * @param key
 */
export function remove(key) {
  window.localStorage.removeItem(key)
}

export default {
  isSupported: isLocalStorageSupported,
  set,
  get,
  remove
}
