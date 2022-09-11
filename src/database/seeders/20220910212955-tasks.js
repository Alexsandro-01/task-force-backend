module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          id: '4db66767-843c-490b-a4a0-1f3ed05abeda',
          tasks: 'Lavar Louça',
          user_id: '8381f5b5-f51f-40f4-9e79-19ba2d86057c',
          active: true,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          id: '3728075e-3666-4f01-9379-3f5722cfd166',
          tasks: 'Lavar roupa',
          user_id: '8381f5b5-f51f-40f4-9e79-19ba2d86057c',
          active: true,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ],
      {},
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
