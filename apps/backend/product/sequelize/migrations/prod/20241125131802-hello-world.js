"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`
       SELECT 'Hello World!' AS message;
      `);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`
       SELECT 'Bye World!' AS message;
      `);
  },
};
