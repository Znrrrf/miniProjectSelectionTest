'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("user_logins", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
    await queryInterface.addColumn("user_logins", "username", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
    await queryInterface.addColumn("user_logins", "password", {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn("user_logins", "is_verified", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn("user_logins", "email")
    await queryInterface.removeColumn("user_logins", "username")
    await queryInterface.removeColumn("user_logins", "password")
    await queryInterface.removeColumn("user_logins", "is_verified")

  }
};
