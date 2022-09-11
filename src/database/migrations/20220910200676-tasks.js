module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      tasks: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('tasks');
  },
};
