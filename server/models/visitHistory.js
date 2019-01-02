'use strict'
module.exports = function(sequelize, DataTypes) {
  var VisitHistory = sequelize.define(
    'VisitHistory',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      username: DataTypes.STRING(45),
      pid: DataTypes.INTEGER(10),
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
      tableName: 'client_doc_visit_history'
    }
  )

  VisitHistory.associate = function(models) {
    models.VisitHistory.belongsTo(models.Project, {
      as: 'Project',
      foreignKey: 'pid'
    })
  }

  return VisitHistory
}
