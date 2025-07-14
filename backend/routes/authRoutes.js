// backend/routes/authRoutes.js

import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// ✅ REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // ✅ Create user with raw password — let the model hash it!
    const user = new User({
      username,
      email,
      password, // raw, gets hashed by the pre-save hook
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error('[Register Error]', err.message);
    res.status(500).json({ message: err.message });
  }
});

// ✅ LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Use your model's matchPassword method
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error('[Login Error]', err.message);
    res.status(500).json({ message: err.message });
  }
});

// ✅ USER COUNT
router.get('/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('[User Count Error]', err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;
