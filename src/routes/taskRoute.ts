import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import TaskService from '../services/TasksService';

const taskService = new TaskService();
const taskController = new TaskController(taskService);

const taskRoute = Router();

taskRoute.post('/create', taskController.create);
taskRoute.post('/update/:id', taskController.update);
taskRoute.get('/get', taskController.getTasks);

export default taskRoute;