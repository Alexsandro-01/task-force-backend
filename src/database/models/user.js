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

/** 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
const User = (sequelize, _DataTypes) => {
  const user = sequelize.define('Users', attributes);

  user.associate = (models) => {
    user.hasMany(models.Tasks, { foreignKey: 'user_id', as: 'user' });
  };

  return user;
};

module.exports = User;