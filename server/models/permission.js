'use strict'

module.exports = function(sequelize, DataTypes) {
  var Permission = sequelize.define(
    'Permission',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      uid: DataTypes.INTEGER(10),
      pid: DataTypes.INTEGER(10),
      role: DataTypes.INTEGER(1),
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
      tableName: 'client_doc_permission'
    }
  )

  Permission.associate = function(models) {
    models.Permission.belongsTo(models.Project, {
      as: 'Project',
      foreignKey: 'pid'
    })
    models.Permission.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'uid'
    })
  }

  return Permission
}
