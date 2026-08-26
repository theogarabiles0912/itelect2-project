'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  async up(queryInterface, Sequelize) {

    const users = await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Theo',
          email: 'theo@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'John',
          email: 'john@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Maria',
          email: 'maria@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {
        returning: true
      }
    );

    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          title: 'Finish GT8',
          dueDate: new Date('2026-08-26'),
          completed: false,
          userId: users[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Test API',
          dueDate: new Date('2026-08-27'),
          completed: false,
          userId: users[1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Review Sequelize',
          dueDate: new Date('2026-08-28'),
          completed: false,
          userId: users[2].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Push Project to GitHub',
          dueDate: new Date('2026-08-29'),
          completed: false,
          userId: users[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Test Postman',
          dueDate: new Date('2026-08-30'),
          completed: false,
          userId: users[1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    );
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});

  }

};