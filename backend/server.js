import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import postRoutes from './routes/postRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors';


// Load env vars
dotenv.config();


// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());

// Parse incoming JSON
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('✅ SparkIn API is running...');
});



// Mount your routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
