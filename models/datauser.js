'use strict';
const {
  Model
} = require('sequelize');
const datauser = require('../seeders/datauser');
module.exports = (sequelize, DataTypes) => {
  class Datauser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Datauser.hasOne(models.userhistory, {
        foreignKey: 'userId'
      })
    }
  }
  Datauser.init({
    username: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'datauser',
    // tableName: 'datauser',
    updatedAt:false,
    underscored:true
  });
  return Datauser;
};