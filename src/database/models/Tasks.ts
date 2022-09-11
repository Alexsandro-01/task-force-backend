import { Model, STRING, DATE, BOOLEAN } from "sequelize";
import Users from "./Users";
import db from '.';

class Tasks extends Model {
  id!: string;
  tasks!: string;
  userId!: string;
  active!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

Tasks.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: STRING,
  },
  tasks: {
    allowNull: false,
    type: STRING,
  },
  userId: {
    allowNull: false,
    type: STRING,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  active: {
    allowNull: false,
    type: BOOLEAN,
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DATE,
  },
  updatedAt: {
    allowNull: false,
    field: 'updated_at',
    type: DATE,
  },
},
{
  underscored: true,
  sequelize: db,
  modelName: 'tasks',
  timestamps: true
});

Tasks.belongsTo(Users, { foreignKey: 'userId' });

export default Tasks;
