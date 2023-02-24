'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: 'user_roles',
        foreignKey: 'userId',
        otherKey: 'roleId'
      });
  
      User.hasMany(models.Status, {
        foreignKey: 'user_id',
        as: 'statuses',
      });

      User.hasMany(models.Chat, {
        foreignKey: 'id_user',
        as: 'chats'
      });

      User.hasMany(models.Chat, {
        foreignKey: 'toId_user',
        as: 'chatsTo'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name_user: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};