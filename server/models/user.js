'use strict'
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      userName: {
        type: DataTypes.STRING(45),
        field: 'user_name'
      },
      userNickName: {
        type: DataTypes.STRING(45),
        field: 'user_nick_name'
      },
      userPassword: {
        type: DataTypes.STRING(45),
        field: 'user_password'
      },
      userTel: {
        type: DataTypes.STRING(20),
        field: 'user_tel'
      },
      userSex: {
        type: DataTypes.STRING(10),
        field: 'user_sex'
      },
      role: {
        type: DataTypes.INTEGER(10),
        field: 'role'
      },
      createTime: {
        type: DataTypes.DATE,
        field: 'create_time'
      },
      updateTime: {
        type: DataTypes.DATE,
        field: 'update_time'
      }
    },
    {
      tableName: 'doc_user'
    }
  )

  return User
}
