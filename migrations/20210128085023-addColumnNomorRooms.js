'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * 
     */
    return queryInterface.addColumn('Rooms', 'room_number', Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */
    return queryInterface.removeColumn('Rooms', 'room_number');
  }
};
