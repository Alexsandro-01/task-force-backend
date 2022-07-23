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
/**
 * @param {import('sequelize').Sequelize} sequleize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
const Task = (sequleize, _DataTypes) => {
  const task = sequleize.define('Task', attributes, { underscored: true });

  task.associate = (models) => {
    task.belongsTo(models.User, { foreignKey: 'user_Id', as: 'user' });
  };
};

module.exports = Task;