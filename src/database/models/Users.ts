import { Model, STRING, DATE, NOW, literal } from "sequelize";
import db from '.';

class Users extends Model {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

Users.init({
  id: {
    primaryKey: true,
    allowNull: false,
    type: STRING,
  },
  name: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
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
  modelName: 'User',
});

export default Users;