"use strict";

const dotenv = require("dotenv");
dotenv.config();

const { DB_SCHEMA: schema = "boh" } = process.env;
const tableName = "products";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log(`Creating table ${schema}.${tableName}...`);
      await queryInterface.createTable(
        {
          schema,
          tableName,
          paranoid: true,
          timestamps: true,
          underscored: false,
        },
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          category: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          link: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
        },
      );
    } catch (error) {
      console.error(`Error creating table ${schema}.${tableName}`, error);
      throw error;
    }
  },

  async down(queryInterface, _Sequelize) {
    try {
      console.log(`Dropping table ${schema}.${tableName}...`);
      await queryInterface.dropTable({
        schema,
        tableName,
      });
    } catch (error) {
      console.error(`Error dropping table ${schema}.${tableName}`, error);
      throw error;
    }
  },
};
