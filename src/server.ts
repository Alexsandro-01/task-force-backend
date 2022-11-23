import express from 'express';
import 'express-async-errors';

import userRoute from './routes/userRoutes';
import taskRoute from './routes/taskRoute';
import errorMidlleware from './middlewares/ErrorMidlleware';



const api = express();

api.use(express.json());

api.use('/users', userRoute);
api.use('/tasks', taskRoute);

api.use(errorMidlleware);

export default api;