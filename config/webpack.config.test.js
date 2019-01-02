'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin')

const yaml = require('js-yaml')
const fs = require('fs-extra')
const baseConfig = require('./webpack.config.base')

const root = path.join(__dirname, '../')
const appConfigPath = path.join(root, 'config/app.yaml')
const appConfig = yaml.safeLoad(fs.readFileSync(appConfigPath)) || {}
// const pkgJSON = require('../package.json')

let buildPath
let publicPath
// 外包资源放置到本地
const appName = appConfig.appCode.toLowerCase()
buildPath = path.join(root, `build/${appName}/static`)
publicPath = `/${appName}/static/`

const config = {
  entry: {
    vendor: [
      'react',
      'lodash',
      'react-router',
      'react-router-dom',
      'react-dom',
      'immutable',
      'moment'
      // 'antd'
    ],
    app: './app'
  },
  devtool: 'inline-source-map',
  output: {
    path: buildPath,
    publicPath: publicPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    hashDigestLength: 22
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[contenthash:22].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['manifest', 'vendor', 'app']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
      filename: 'manifest.js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      children: true,
      // deepChildren: true,
      minChunks: 2
    }),
    new InlineChunkWebpackPlugin({
      inlineChunks: ['manifest']
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
}

module.exports = merge(baseConfig, config)
