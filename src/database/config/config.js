require('dotenv').config();

const { HOST, DB_NAME, DB_USER, PASSWORD, PORT, DIALETIC } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: PASSWORD,
    database: DB_NAME,
    host: HOST,
    dialect: DIALETIC,
    port: PORT,
  },
  test: {
    username: DB_USER,
    password: PASSWORD,
    database: DB_NAME,
    host: HOST,
    dialect: DIALETIC,
    port: PORT,
  },
  production: {
    username: DB_USER,
    password: PASSWORD,
    database: DB_NAME,
    host: HOST,
    dialect: DIALETIC,
    port: PORT,
  },
};
