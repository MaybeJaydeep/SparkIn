import Post from '../models/Post.js'; // ✅ THIS LINE is REQUIRED

// CREATE a post
export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = new Post({ title, content, tags });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET post by slug
export const getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await Post.findOne({ slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE post by slug
export const updatePostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      req.body,
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
