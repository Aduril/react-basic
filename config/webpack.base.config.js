const path = require('path')
const webpack = require('webpack')
const baseWebpack = {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        options: {
        },
      },
      {
        // Babel for webpack manifest etc.
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'entry',
                targets: 'last 2 versions, ie 11',
                modules: false,
              },
            ],
          ],
        },
      },
    ],
  },
}
module.exports = { baseWebpack }
