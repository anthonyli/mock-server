'use strict'
module.exports = function(sequelize, DataTypes) {
  var OperateLog = sequelize.define(
    'OperateLog',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      username: DataTypes.STRING(45),
      action: DataTypes.STRING(45),
      detail: DataTypes.STRING(500),
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
      tableName: 'client_doc_operate_log'
    }
  )

  return OperateLog
}
