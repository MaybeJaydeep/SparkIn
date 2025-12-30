/**
 * Post Model
 * Defines blog post schema with auto-generated slugs
 */

import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Post title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: { 
      type: String, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    content: { 
      type: String, 
      required: [true, 'Post content is required']
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function(tags) {
          return tags.length <= 10;
        },
        message: 'Cannot have more than 10 tags'
      }
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post author is required'],
    },
  },
  { timestamps: true }
);

/**
 * Auto-generate URL-friendly slug from title before saving
 * Only generates if title is new or modified
 */
postSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, { 
      lower: true, 
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;
