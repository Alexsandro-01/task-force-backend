module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: '8381f5b5-f51f-40f4-9e79-19ba2d86057c',
          name: 'Ada Lovelace',
          email: 'ada.love@hotmail.com',
          password: '$2b$04$UBuwkp9zxS4ogoYPmbWRE.OjMlzFf85Ku7sp/64UGL61kl5NlRJ6K',
        },
        {
          id: 'b5127c91-f89c-494d-a0b0-a738567186da',
          name: 'Malenia Carmesin',
          email: 'mal.carmesin@hotmail.com',
          password: '$2b$04$Q/S.Q9vlMeUu8DolJx6NteXjKxxiYrcLkEVbe/U59LKIoo.zkd1Ri',
        },
      ],
      {},
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
