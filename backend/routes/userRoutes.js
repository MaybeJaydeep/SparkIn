// routes/userRoutes.js
import express from 'express';
import {
  getAllUsers,
  getUserByUsername,
  updateUserProfile,
} from '../controllers/userController.js';
import {
  getUserBookmarks,
  createBookmark,
  deleteBookmark,
  checkBookmark
} from '../controllers/bookmarkController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/users/  -> Get all users
router.get('/', getAllUsers);

// GET /api/users/:username  -> Get user profile + posts
router.get('/:username', getUserByUsername);

// PUT /api/users/:username  -> Update user profile
router.put('/:username', protect, updateUserProfile);

// Bookmark routes
// GET /api/users/:username/bookmarks -> Get user's bookmarks
router.get('/:username/bookmarks', getUserBookmarks);

// POST /api/users/:username/bookmarks -> Create bookmark
router.post('/:username/bookmarks', protect, createBookmark);

// DELETE /api/users/:username/bookmarks/:postId -> Delete bookmark
router.delete('/:username/bookmarks/:postId', protect, deleteBookmark);

// GET /api/users/:username/bookmarks/:postId -> Check if post is bookmarked
router.get('/:username/bookmarks/:postId', checkBookmark);

export default router;
