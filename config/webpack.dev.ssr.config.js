const baseWebpack = require('./webpack.prod.config')

const baseProdWebpack = {
  mode: 'development',
}

module.exports = [
  {
    ...baseWebpack[0],
    ...baseProdWebpack,
  },
  {
    ...baseWebpack[1],
    ...baseProdWebpack,
  },
]
