'use strict'

const path = require('path')

module.exports = (appInfo) => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531535995263_7437'

  // add your config here
  config.middleware = ['errorPage', 'errorHandler']

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'client/dist'),
    gzip: true
  }

  config.session = {
    key: 'EGG_SESS',
    maxAge: 0,
    httpOnly: true,
    encrypt: true
  }

  config.httpclient = {
    request: {
      timeout: 30000
    }
  }

  config.security = {
    csrf: {
      enable: false
    }
  }

  return config
}
