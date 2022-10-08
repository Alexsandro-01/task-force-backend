module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          tasks: 'Lavar Louça',
          user_id: '8381f5b5-f51f-40f4-9e79-19ba2d86057c',
          active: true,
        },
        {
          tasks: 'Lavar roupa',
          user_id: '8381f5b5-f51f-40f4-9e79-19ba2d86057c',
          active: true,
        },
      ],
      {},
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
