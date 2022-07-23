const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
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
    await queryInterface.createTable('Users', attributes);
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Users');
  },
};