module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: '8381f5b5-f51f-40f4-9e79-19ba2d86057c',
          name: 'Ada Lovelace',
          email: 'ada.love@hotmail.com',
          password: '$2b$08$cnX9f4rFQjYEmeIxnsdehu26xPnGi3ifV/tdkeysBsuvD4tqMXrne', // M2y^f45
        },
        {
          id: 'b5127c91-f89c-494d-a0b0-a738567186da',
          name: 'Malenia Carmesin',
          email: 'mal.carmesin@hotmail.com',
          password: '$2b$08$ptzJU7zVNWvtxkWR3bWg8O7UVXtlI1AYRbbcLWp2SfIupP8B.9fdy', // Bl@de0fMiqu3l4
        },
      ],
      {},
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
