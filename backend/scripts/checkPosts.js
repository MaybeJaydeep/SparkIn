// backend/scripts/checkPosts.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from '../models/Post.js';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const checkPosts = async () => {
  try {
    console.log('🔍 Checking posts in database...');

    // Count all posts
    const totalPosts = await Post.countDocuments();
    console.log(`📊 Total posts in database: ${totalPosts}`);

    // Count published posts
    const publishedPosts = await Post.countDocuments({ published: true });
    console.log(`📊 Published posts: ${publishedPosts}`);

    // Count unpublished posts
    const unpublishedPosts = await Post.countDocuments({ published: false });
    console.log(`📊 Unpublished posts: ${unpublishedPosts}`);

    // Get all posts with details
    const posts = await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    console.log('\n📝 Post details:');
    posts.forEach((post, index) => {
      console.log(`${index + 1}. "${post.title}"`);
      console.log(`   - ID: ${post._id}`);
      console.log(`   - Slug: ${post.slug}`);
      console.log(`   - Published: ${post.published}`);
      console.log(`   - Author: ${post.author?.username || 'No author'}`);
      console.log(`   - Created: ${post.createdAt}`);
      console.log(`   - Tags: ${post.tags?.join(', ') || 'No tags'}`);
      console.log('');
    });

    // Test the query used by getAllPosts
    console.log('🧪 Testing getAllPosts query...');
    const testQuery = { published: true };
    const testPosts = await Post.find(testQuery)
      .populate('author', 'username email bio avatar')
      .sort({ createdAt: -1 })
      .limit(10);

    console.log(`📊 Query result: ${testPosts.length} posts found`);

    // Check users
    const userCount = await User.countDocuments();
    console.log(`👥 Total users: ${userCount}`);

  } catch (error) {
    console.error('❌ Error checking posts:', error.message);
  }
};

const check = async () => {
  console.log('🚀 Starting database check...');

  await connectDB();
  await checkPosts();

  console.log('✅ Check complete!');
  process.exit(0);
};

check().catch((error) => {
  console.error('❌ Check failed:', error);
  process.exit(1);
});
