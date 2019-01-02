'use strict'

const fs = require('fs')
const path = require('path')

const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'

module.exports = config => {
  const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,

    port: config.port,

    dialect: 'mysql',
    /* eslint no-console:off */
    logging: env === 'development' || false,

    timezone: '+08:00',
    /* 加利福尼亚州 */
    // timezone: '-08:00',

    pool: {
      max: 10
    },

    define: {
      timestamps: false
    }
  })

  const db = {}
  fs.readdirSync(__dirname)
    .filter(function(file) {
      return file.indexOf('.') !== 0 && file !== 'index.js'
    })
    .forEach(function(file) {
      var model = sequelize['import'](path.join(__dirname, file))
      db[model.name] = model
    })

  Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })

  db.sequelize = sequelize
  return db
}
