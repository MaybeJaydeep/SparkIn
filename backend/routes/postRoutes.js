// backend/routes/postRoutes.js
import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// @desc   Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc   Create new post
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

// @desc   Get single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc   Update post by ID
router.put('/:id', async (req, res) => {
  const { title, content, tags, author } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      post.title = title || post.title;
      post.content = content || post.content;
      post.tags = tags || post.tags;
      post.author = author || post.author;

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc   Delete post by ID
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      await post.remove();
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
