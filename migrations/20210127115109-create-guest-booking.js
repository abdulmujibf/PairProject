'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GuestBookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      GuestId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Guests',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      number_of_rooms: {
        type: Sequelize.INTEGER
      },
      checkIn: {
        type: Sequelize.DATE
      },
      checkOut: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GuestBookings');
  }
};