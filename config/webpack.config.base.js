'use strict'

const path = require('path')
const os = require('os')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const yaml = require('js-yaml')
const fs = require('fs')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const root = path.join(__dirname, '../')
const srcPath = path.join(root, 'client')
const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

const appConfigPath = path.join(root, 'config/app.yaml')
const appConfig = yaml.safeLoad(fs.readFileSync(appConfigPath)) || {}
const pkg = require('../package.json')
const homeDir = os.homedir()
const happyTempDir = path.join(homeDir, `.happypack/${pkg.name}`)

module.exports = {
  context: srcPath,

  resolve: {
    alias: {
      common: path.join(srcPath, 'common'),
      components: path.join(srcPath, 'components'),
      utils: path.join(srcPath, 'utils'),
      assets: path.join(srcPath, 'assets'),
      pages: path.join(srcPath, 'pages')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'happypack/loader',
        options: {
          id: 'js'
        }
      },
      {
        test: /\.tpl$/,
        loader: 'dot-tpl-loader'
      },
      {
        oneOf: [
          {
            test: /\.html$/,
            resourceQuery: /\?.*/,
            use: ['nunjucks-loader', 'extract-loader', 'html-loader']
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          }
        ]
      },
      {
        oneOf: [
          {
            test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
            resourceQuery: /\?.*/,
            loader: 'url-loader'
          },
          {
            test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
            loader: 'file-loader',
            options: {
              name: isDev ? '[path][name].[ext]' : '[hash:22].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'happypack/loader',
              options: {
                id: 'less'
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      tempDir: happyTempDir,
      loaders: ['babel-loader'],
      verbose: isDev,
      verboseWhenProfiling: isDev
    }),
    new HappyPack({
      id: 'less',
      threadPool: happyThreadPool,
      tempDir: happyTempDir,
      loaders: [
        {
          loader: 'css-loader',
          options: {
            minimize: !isDev,
            sourceMap: isDev
          }
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: isDev,
            modifyVars: getTheme(appConfig.theme)
          }
        }
      ],
      verbose: isDev,
      verboseWhenProfiling: isDev,
      cache: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn']
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),

    new HtmlWebpackPlugin({
      inject: false,
      filename: 'error.html',
      template: 'public/error.html'
    })
  ]
}

// 获取主题
function getTheme(theme) {
  // 全局默认配置
  const defaultTheme = require(path.join(srcPath, 'theme/default'))

  // 已配置主题
  if (theme) {
    const themePath = path.join(srcPath, 'theme', theme)

    if (fs.existsSync(`${themePath}.js`)) {
      return Object.assign(defaultTheme, require(themePath))
    } else {
      // eslint-disable-next-line
      console.warn(`WARNING: 主题 ${theme} 不存在，请确认主题配置是否正确`)
    }
  }

  return defaultTheme
}
