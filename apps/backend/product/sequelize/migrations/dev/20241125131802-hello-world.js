"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const result = await queryInterface.sequelize.query(`
       SELECT 'Hello World!' AS message;
      `, { raw: true });
    const { message } = result[0][0];
    console.log(message);
  },

  async down(queryInterface, Sequelize) {
    const result = await queryInterface.sequelize.query(`
       SELECT 'Bye World!' AS message;
      `, { raw: true });
    const { message } = result[0][0];
    console.log(message);
  },
};
