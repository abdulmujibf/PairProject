'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Guest.hasMany(models.GuestBooking, {foreignKey: 'GuestId'})
      Guest.belongsTo(models.User, {foreignKey: 'userId'})
    }
  };
  Guest.init({
    name: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Guest',
  });
  return Guest;
};