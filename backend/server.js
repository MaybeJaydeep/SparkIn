// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('✅ SparkIn API is running...');
});

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
