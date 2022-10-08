"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = __importDefault(require("./database/models/Users"));
const Tasks_1 = __importDefault(require("./database/models/Tasks"));
const PORT = 3000;
const api = (0, express_1.default)();
api.use(express_1.default.json());
api.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Users_1.default.findAll();
    res.status(200).json(response);
}));
api.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Tasks_1.default.findAll();
    res.status(200).json(response);
}));
api.listen(PORT, () => console.log(`Listen at port ${PORT}`));
