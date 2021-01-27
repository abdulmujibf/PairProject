'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DetailBookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      GuestBookingId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'GuestBookings',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      RoomId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      totalPrice: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('DetailBookings');
  }
};