// seedAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

// 🔐 Replace with your MongoDB connection URI in `.env`
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blogApp';

const seedAdmin = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    const existingAdmin = await User.findOne({ email: 'admin@example.com' });

    if (existingAdmin) {
      console.log('Admin already exists');
    } else {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);

      const adminUser = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      });

      await adminUser.save();
      console.log('✅ Admin user created');
    }

    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Failed to seed admin:', err.message);
    process.exit(1);
  }
};

seedAdmin();
