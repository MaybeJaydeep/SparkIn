// backend/routes/postRoutes.js
import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// ✅ GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ CREATE new post
router.post('/', async (req, res) => {
  const { title, content, tags, author } = req.body;

  try {
    const post = new Post({
      title,
      content,
      tags,
      author,
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
    const post = await Post.findOne({ slug: req.params.slug });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE post by slug
router.put('/:slug', async (req, res) => {
  const { title, content, tags, author } = req.body;

  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (post) {
      post.title = title || post.title;
      post.content = content || post.content;
      post.tags = tags || post.tags;
      post.author = author || post.author;

      // ✅ Regenerate slug if title changed
      if (title && title !== post.title) {
        post.slug = title
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '');
      }

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE post by slug
router.delete('/:slug', async (req, res) => {
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
