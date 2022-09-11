import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
    username: process.env.DB_USER || '',
    password: process.env.PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.HOST || '',
    port: Number(process.env.PORT) || 5432,
    dialect: 'postgres',
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