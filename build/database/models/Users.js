"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Users extends sequelize_1.Model {
}
Users.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: sequelize_1.STRING,
    },
    name: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    email: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    password: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    createdAt: {
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIMESTAMP'),
        allowNull: false,
        field: 'created_at',
        type: sequelize_1.DATE,
    },
}, {
    timestamps: false,
    underscored: true,
    sequelize: _1.default,
    modelName: 'User',
});
exports.default = Users;
