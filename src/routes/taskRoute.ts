import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import TaskService from '../services/TasksService';

const taskService = new TaskService();
const taskController = new TaskController(taskService);

const taskRoute = Router();

taskRoute.use('/create', taskController.create);
taskRoute.use('/update/:id', taskController.update);

export default taskRoute;