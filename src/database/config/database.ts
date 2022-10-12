import dotenv from 'dotenv';
import { Options } from 'sequelize';

dotenv.config();

const config: Options = {
    username: process.env.DB_USER || '',
    password: process.env.PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.HOST || '',
    port: Number(process.env.PORT) || 3306,
    dialect: 'mysql',
}

// const config: Options = {
//   username: 'root',
//   password: 'root',
//   database: 'task-force',
//   host: 'localhost',
//   port: 3306,
//   dialect: 'mysql',
// }

export = config;
