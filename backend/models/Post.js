// backend/models/Post.js
import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [String],
}, {
  timestamps: true,
});

// ✅ Pre-save middleware to auto-generate slug using slugify
postSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true, // removes special characters
      trim: true,
    });
  }
  next();
});

const Post = mongoose.model('Post', postSchema);

export default Post;
