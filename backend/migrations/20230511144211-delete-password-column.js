'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn("user_logins", "passsword")

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn("user_logins", "username");

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
    await queryInterface.addColumn("user_logins", "passsword", {
      type: Sequelize.STRING,
      allowNull: false
    });

  }
};
