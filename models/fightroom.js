'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fightRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fightRoom.init({
    roomCode: DataTypes.STRING,
    playerOne: DataTypes.STRING,
    playerTwo: DataTypes.STRING,
    hasil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fightRoom',
  });
  return fightRoom;
};