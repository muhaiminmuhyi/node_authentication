'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user'
      });

      Chat.belongsTo(models.User, {
        foreignKey: 'toId_user',
        as: 'users'
      });
    }
  }
  Chat.init({
    id_user: DataTypes.STRING,
    chatText: DataTypes.STRING,
    toId_user: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};