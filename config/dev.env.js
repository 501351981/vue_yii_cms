'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://api.github.mooov.cn"',
  PC_DOMAIN:'"https://www.shanhuxueyuan.com"',
  M_DOMAIN:'"https://m.shanhuxueyuan.com"'
})
