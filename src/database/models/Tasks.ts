import { Model, STRING, DATE, BOOLEAN, INTEGER, NOW, literal } from "sequelize";
import Users from "./Users";
import db from '.';

class Tasks extends Model {
  id!: number;
  task!: string;
  userId!: string;
  active!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

Tasks.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  task: {
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
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false,
    field: 'created_at',
    type: DATE,
  },
},
{
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'Task',
});

Tasks.belongsTo(Users, { foreignKey: 'userId' });

export default Tasks;
