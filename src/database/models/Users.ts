import { Model, STRING, DATE } from "sequelize";
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
  modelName: 'users',
  timestamps: true
});

export default Users;