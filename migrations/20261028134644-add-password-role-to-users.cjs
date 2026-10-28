
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'member'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.removeColumn('Users', 'password');
  }
};
