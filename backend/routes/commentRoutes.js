// backend/routes/commentRoutes.js
import express from 'express';
import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
  toggleLikeComment
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ GET comments for a post
router.get('/post/:postId', getCommentsByPost);

// ✅ CREATE a comment (protected)
router.post('/', protect, createComment);

// ✅ UPDATE a comment (protected)
router.put('/:commentId', protect, updateComment);

// ✅ DELETE a comment (protected)
router.delete('/:commentId', protect, deleteComment);

// ✅ LIKE/UNLIKE a comment (protected)
router.post('/:commentId/like', protect, toggleLikeComment);

export default router;
