import { Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';

const userService = new UserService();
const userController = new UserController(userService);

const userRoute = Router();

userRoute.post('/login', userController.login);

export default userRoute;