// routes/userRoutes.js
import express from 'express';
import {
  getAllUsers,
  getUserByUsername,
  updateUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

// GET /api/users/  -> Get all users
router.get('/', getAllUsers);

// GET /api/users/:username  -> Get user profile + posts
router.get('/:username', getUserByUsername);

// PUT /api/users/:username  -> Update user profile
router.put('/:username', updateUserProfile);

export default router;
