import request from '@/utils/request'

/**
 * 账户密码登录
 * @param data {account: string, password: string}
 * @returns {AxiosPromise<any> | * | void}
 */
function loginByUsername(data) {
  return request.post('/user/signIn', data)
}

/**
 * 获取用户信息
 * @returns {AxiosPromise<any> | * | void}
 */
function getUserInfo() {
  return request.post('/user/userInfo')
}

/**
 * 退出登录
 * @param token
 * @returns {AxiosPromise<any> | * | void}
 */
function logout() {
  return request.post('/user/signOut')
}

export {
  loginByUsername,
  getUserInfo,
  logout
}
