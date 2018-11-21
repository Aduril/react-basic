const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TSLintPlugin = require('tslint-webpack-plugin')
const { s3BasePathFromEnv } = require('./helper')
const { baseWebpack } = require('./webpack.base.config')

const baseProdWebpack = {
  mode: 'production',
}

module.exports = [
  {
    ...baseWebpack,
    ...baseProdWebpack,
    entry: ['@babel/polyfill', './src/lib/client-entry.tsx'],
    target: 'web',
    output: {
      filename: 'client.[hash:8].js',
      path: path.resolve(__dirname, '..', 'dist'),
      publicPath: `/${s3BasePathFromEnv()}`,
      libraryTarget: 'umd',
    },
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
  },
  {
    ...baseWebpack,
    ...baseProdWebpack,
    entry: './src/lib/server-entry.tsx',
    target: 'node',
    output: {
      filename: 'server-bundle.js',
      path: path.resolve(__dirname, '..', 'dist'),
      libraryTarget: 'umd',
    },
  },
]
