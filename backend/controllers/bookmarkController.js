// backend/controllers/bookmarkController.js
import Bookmark from '../models/Bookmark.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

/**
 * GET user's bookmarks
 */
export const getUserBookmarks = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all bookmarks for this user
    const bookmarks = await Bookmark.find({ user: user._id })
      .populate({
        path: 'post',
        select: 'title slug content createdAt',
        populate: {
          path: 'author',
          select: 'username'
        }
      })
      .sort({ createdAt: -1 });

    // Transform to a more friendly format
    const formattedBookmarks = bookmarks.map(bookmark => ({
      id: bookmark._id,
      post: bookmark.post._id,
      title: bookmark.post.title,
      slug: bookmark.post.slug,
      createdAt: bookmark.createdAt
    }));

    res.json(formattedBookmarks);
  } catch (err) {
    console.error('[bookmarkController] getUserBookmarks:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * POST create bookmark
 */
export const createBookmark = async (req, res) => {
  try {
    const { username } = req.params;
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if bookmark already exists
    const existingBookmark = await Bookmark.findOne({ user: user._id, post: postId });
    if (existingBookmark) {
      return res.status(400).json({ message: 'Post already bookmarked' });
    }

    // Create new bookmark
    const bookmark = new Bookmark({
      user: user._id,
      post: postId
    });

    await bookmark.save();

    res.status(201).json({
      id: bookmark._id,
      post: postId,
      message: 'Post bookmarked successfully'
    });
  } catch (err) {
    console.error('[bookmarkController] createBookmark:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * DELETE remove bookmark
 */
export const deleteBookmark = async (req, res) => {
  try {
    const { username, postId } = req.params;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find and delete the bookmark
    const bookmark = await Bookmark.findOneAndDelete({ user: user._id, post: postId });

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.json({ message: 'Bookmark removed successfully' });
  } catch (err) {
    console.error('[bookmarkController] deleteBookmark:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET check if post is bookmarked by user
 */
export const checkBookmark = async (req, res) => {
  try {
    const { username, postId } = req.params;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if bookmark exists
    const bookmark = await Bookmark.findOne({ user: user._id, post: postId });

    res.json({ isBookmarked: !!bookmark });
  } catch (err) {
    console.error('[bookmarkController] checkBookmark:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
