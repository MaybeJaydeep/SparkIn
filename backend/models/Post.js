// backend/models/Post.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, default: 'Anonymous' },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
