const { baseWebpack } = require('./webpack.base.config')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const TSLintPlugin = require('tslint-webpack-plugin')
module.exports = {
  ...baseWebpack,
  entry: ['@babel/polyfill', './src/lib/dev-entry.tsx'],
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new TSLintPlugin({
      files: [
        './src/**/*.ts',
        './src/**/*.tsx',
      ],
      force: true,
      fix: true,
      typeCheck: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: './src/index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
  },
}
