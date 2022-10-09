import express from 'express';
import 'express-async-errors';

import userRoute from './routes/userRoutes';
import errorMidlleware from './middlewares/ErrorMidlleware';

const PORT = 3000;

const api = express();

api.use(express.json());

api.use('/user', userRoute);

api.use(errorMidlleware);
api.listen(PORT, () => console.log(`Listen at port: ${PORT}`));