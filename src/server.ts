import express from 'express';
import 'express-async-errors';

import userRoute from './routes/userRoutes';
import errorMidlleware from './middlewares/ErrorMidlleware';

const api = express();

api.use(express.json());

api.use('/user', userRoute);

api.use(errorMidlleware);

export default api;