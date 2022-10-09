"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    username: process.env.DB_USER || '',
    password: process.env.PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.HOST || '',
    port: Number(process.env.PORT) || 3306,
    dialect: 'mysql',
};
module.exports = config;
