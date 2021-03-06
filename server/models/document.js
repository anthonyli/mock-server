'use strict'
module.exports = function(sequelize, DataTypes) {
  var Document = sequelize.define(
    'Document',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      pid: DataTypes.INTEGER(10),
      title: DataTypes.STRING(128),
      author: DataTypes.STRING(45),
      status: DataTypes.INTEGER(1),
      content: DataTypes.TEXT,
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
      tableName: 'doc_document'
    }
  )

  return Document
}
