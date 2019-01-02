'use strict'
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      pid: DataTypes.INTEGER(10),
      name: DataTypes.STRING(128),
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
      tableName: 'client_doc_category'
    }
  )

  Category.associate = function(models) {
    models.Category.hasMany(models.Document, {
      as: 'Document',
      foreignKey: 'categoryId'
    })
  }

  return Category
}
