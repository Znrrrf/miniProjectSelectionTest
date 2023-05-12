'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn("user_logins", "is_verified")

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.addColumn("user_logins", "is_verified", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });

  }
};
