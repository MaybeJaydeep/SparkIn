import Post from '../models/Post.js';

// ✅ CREATE a post — includes author & slug
export const createPost = async (req, res) => {
  try {
    const { title, content, tags, author, authorId } = req.body;

    if (!title || !content || !author || !authorId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const post = new Post({
      title,
      content,
      tags,
      author,
      authorId,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET post by slug
export const getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await Post.findOne({ slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('[getPostBySlug]', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE post by slug
export const updatePostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error('[updatePostBySlug]', error);
    res.status(500).json({ message: error.message });
  }
};
