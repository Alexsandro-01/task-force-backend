"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Users_1 = __importDefault(require("./Users"));
const _1 = __importDefault(require("."));
class Tasks extends sequelize_1.Model {
}
Tasks.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.STRING,
    },
    tasks: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
    userId: {
        allowNull: false,
        type: sequelize_1.STRING,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id',
        },
    },
    active: {
        allowNull: false,
        type: sequelize_1.BOOLEAN,
    },
    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: sequelize_1.DATE,
    },
    updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: sequelize_1.DATE,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'tasks',
    timestamps: true
});
Tasks.belongsTo(Users_1.default, { foreignKey: 'userId' });
exports.default = Tasks;
