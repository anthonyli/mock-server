'use strict'
module.exports = function(sequelize, DataTypes) {
  var Mock = sequelize.define(
    'Mock',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      did: { type: DataTypes.INTEGER(10) },
      content: DataTypes.TEXT,
      path: DataTypes.STRING(100),
      title: DataTypes.STRING(45),
      createdTime: {
        type: DataTypes.DATE,
        field: 'created_time'
      },
      updatedTime: {
        type: DataTypes.DATE,
        field: 'updated_time'
      }
    },
    {
      tableName: 'client_doc_mock'
    }
  )
  return Mock
}
