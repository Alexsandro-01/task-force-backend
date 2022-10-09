import express from 'express';
import userRoute from './routes/userRoutes';

const PORT = 3000;

const api = express();

api.use(express.json());

api.use('/user', userRoute);

api.listen(PORT, () => console.log(`Listen at port: ${PORT}`));