// controllers/userController.js

import User from '../models/User.js';
import Post from '../models/Post.js';

/**
 * GET all users
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error('[userController] getAllUsers:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET user by username + posts
 */
export const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      username: user.username,
      email: user.email,
      bio: user.bio ?? '',
      avatar: user.avatar ?? '',
      social: user.social ?? {},
      posts,
    });
  } catch (err) {
    console.error('[userController] getUserByUsername:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * PUT update user profile
 */
export const updateUserProfile = async (req, res) => {
  const { username } = req.params;
  const { bio, avatar, social } = req.body;

  try {
    const updated = await User.findOneAndUpdate(
      { username },
      {
        bio: bio ?? '',
        avatar: avatar ?? '',
        social: {
          github: social?.github ?? '',
          twitter: social?.twitter ?? '',
          linkedin: social?.linkedin ?? '',
          // Add other socials as needed
        },
      },
      { new: true }
    ).select('-password');

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      username: updated.username,
      bio: updated.bio,
      avatar: updated.avatar,
      social: updated.social,
    });
  } catch (err) {
    console.error('[userController] updateUserProfile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
