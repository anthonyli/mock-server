const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const configPath = path.join(__dirname, '../../config/app.yaml')
const config = yaml.safeLoad(fs.readFileSync(configPath))

const pkg = require(path.join(__dirname, '../../package.json'))

config.baseURI = config.baseURI || ''
config.apiPrefix = config.apiPrefix || ''
config.layout = config.layout || 'basic'
config.version = pkg.version

module.exports = config
