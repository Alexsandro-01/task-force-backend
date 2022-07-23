const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  tasks: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    onDelete: 'CASCADE',
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.createTable('Tasks', attributes);
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Tasks');
  },
};