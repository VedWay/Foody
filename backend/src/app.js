//create server
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
const app = express();

import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);


export default app;