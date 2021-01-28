'use strict';
const fs = require('fs')
module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    let data = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'))
        data.forEach(el => {
          el.createdAt = new Date(),
          el.updatedAt = new Date()
        });

     return queryInterface.bulkInsert('Rooms', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};
