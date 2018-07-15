'use strict';

const path = require('path')

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531535995263_7437';

  // add your config here
  config.middleware = ['errorHandler'];

  // config.koaStatic = {
  //   root: path.join(appInfo.baseDir, 'client/dist'),
  //   opts: {
  //     maxage: 365 * 24 * 60 * 60 * 1000,
  //     gzip: true
  //   }
  // }

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'client/dist'),
    gzip: true
  }

  config.jwt = {
    secret: "123456"
  };

  config.httpclient = {
    request: {
      timeout: 30000
    }
  }

  config.security = {
    csrf: {
      enable: false,
    }
  };

  return config;
};