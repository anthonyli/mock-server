'use strict'

const path = require('path')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const webpack = require('webpack')
const fs = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

const root = path.join(__dirname, '../')
const buildPath = path.join(root, 'build')
const srcPath = path.join(root, 'client')
const dllPath = path.join(srcPath, 'dll/vendor-manifest.json')
const isDllExist = fs.existsSync(dllPath)

const config = {
  entry: {
    app: './app'
  },
  devtool: 'cheap-module-source-map',
  output: {
    pathinfo: true,
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  plugins: [
    ...(isDllExist
      ? [
          new webpack.DllReferencePlugin({
            manifest: require(dllPath)
          }),
          new HtmlWebpackIncludeAssetsPlugin({
            assets: ['../client/dll/vendor.dll.js'],
            append: false,
            hash: true
          })
        ]
      : []),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),

    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    })
  ]
}

module.exports = merge(baseConfig, config)
