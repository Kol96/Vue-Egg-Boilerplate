'use strict'

// had enabled by egg
exports.static = true

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

exports.routerPlus = {
  enable: true,
  package: 'egg-router-plus'
}
