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
      tableName: 'doc_project'
    }
  )

  Project.associate = function(models) {}

  return Project
}
