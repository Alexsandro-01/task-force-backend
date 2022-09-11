"use strict";
require("dotenv/config");
const config = {
    username: process.env.DB_USER || '',
    password: process.env.PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.HOST || '',
    port: Number(process.env.PORT) || 5432,
    dialect: 'postgres',
};
module.exports = config;
