'use strict'
module.exports = function(sequelize, DataTypes) {
  var Namespace = sequelize.define(
    'Namespace',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      nameSpace: {
        type: DataTypes.STRING(128),
        field: 'name_space'
      },
      description: DataTypes.STRING(500),
      uid: DataTypes.INTEGER(10),
      status: DataTypes.INTEGER(1),
      type: DataTypes.INTEGER(10),
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
      tableName: 'doc_namespace'
    }
  )

  Namespace.associate = function(models) {
    models.Namespace.hasMany(models.Permission, {
      as: 'Permission',
      foreignKey: 'nid'
    })
  }

  return Namespace
}
