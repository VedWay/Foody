// In backend/src/app.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';

const app = express();

// Enable CORS with specific options
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow Postman / server-to-server

      if (origin.startsWith('http://localhost:')) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));


import cookieParser from 'cookie-parser';

app.use(express.json({ limit: "10mb" })); // optional bigger limit
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;