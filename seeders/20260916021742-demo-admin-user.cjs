'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hashed = await bcrypt.hash('AdminPass123', 10);
    await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      email: 'admin@example.com',
      password: hashed,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', { role: 'admin' });
  }
};