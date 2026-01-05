//create server
import express from 'express';
import authRoutes from './routes/authRoutes.js';
const app = express();

import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);


export default app;