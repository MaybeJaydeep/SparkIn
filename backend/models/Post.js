// backend/models/Post.js
import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    tags: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // ✅ Reference User model
      required: true,
    },
  },
  { timestamps: true }
);

// Auto-generate slug
postSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;
