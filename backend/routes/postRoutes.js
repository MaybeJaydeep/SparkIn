// backend/routes/postRoutes.js
import express from 'express';
import Post from '../models/Post.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ CREATE new post (protected)
router.post('/', protect, async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const post = new Post({
      title,
      content,
      tags,
      slug,
      author: req.user._id, // 👈 trusted author
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ GET single post by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'username avatar bio');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ UPDATE post by slug (protected)
router.put('/:slug', protect, async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (post) {
      // ✅ Regenerate slug before updating title
      if (title && title !== post.title) {
        post.slug = title
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '');
      }

      post.title = title || post.title;
      post.content = content || post.content;
      post.tags = tags || post.tags;

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE post by slug (protected)
router.delete('/:slug', protect, async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (post) {
      await post.deleteOne();
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
