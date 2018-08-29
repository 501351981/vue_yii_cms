'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://api.myvue234.com"',
  PC_DOMAIN:'"https://www.shanhuxueyuan.com"',
  M_DOMAIN:'"https://m.shanhuxueyuan.com"'
})
