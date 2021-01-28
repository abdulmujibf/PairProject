'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GuestBooking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GuestBooking.belongsTo(models.Guest, {foreignKey: 'GuestId'})
      GuestBooking.hasMany(models.Room, {through: 'DetailBookings'})
    }
  };
  GuestBooking.init({
    GuestId: DataTypes.INTEGER,
    number_of_rooms: DataTypes.INTEGER,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'GuestBooking',
  });
  return GuestBooking;
};