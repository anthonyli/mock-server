'use strict'
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define(
    'Project',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      projectName: {
        type: DataTypes.STRING(128),
        field: 'project_name'
      },
      description: DataTypes.STRING(500),
      author: DataTypes.STRING(45),
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
      tableName: 'client_doc_project'
    }
  )

  Project.associate = function(models) {
    models.Project.hasMany(models.Document, {
      as: 'Document',
      foreignKey: 'pid'
    })
    models.Project.hasMany(models.Category, {
      as: 'Category',
      foreignKey: 'pid'
    })
  }

  return Project
}
