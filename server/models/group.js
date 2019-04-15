'use strict'
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define(
    'Group',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      groupName: {
        type: DataTypes.STRING(128),
        field: 'group_name'
      },
      description: DataTypes.STRING(500),
      uid: DataTypes.INTEGER(10),
      status: DataTypes.INTEGER(1),
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
      tableName: 'doc_group'
    }
  )

  Group.associate = function(models) {
    models.Group.hasMany(models.Permission, {
      as: 'Permission',
      foreignKey: 'gid'
    })
  }

  return Group
}
