import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import connectDB from './db.js';
import postRoutes from './routes/postRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Trust proxy (important if behind a reverse proxy like Render/NGINX)
app.set('trust proxy', 1);

// CORS configuration
const allowedOrigins = (process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Basic security headers
app.use(helmet());

// Rate limiting for all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Parse incoming JSON
app.use(express.json({ limit: '1mb' }));

// Simple health check route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: '✅ SparkIn API is running...' });
});

// Mount your routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/comments', commentRoutes);

// 404 & error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
