// backend/scripts/simpleSeed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Post from '../models/Post.js';

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

const simpleSeed = async () => {
  try {
    console.log('🌱 Starting simple seed...');

    // Find existing admin user or create one
    let user = await User.findOne({ username: 'admin' });
    if (!user) {
      user = new User({
        username: 'admin',
        email: 'admin@sparkin.com',
        password: 'admin123',
        role: 'admin',
        bio: 'Administrator of SparkIn platform'
      });
      await user.save();
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user found');
    }

    // Check if posts exist
    const existingPosts = await Post.countDocuments();
    console.log(`📊 Existing posts: ${existingPosts}`);

    if (existingPosts === 0) {
      // Create simple posts
      const posts = [
        {
          title: 'Welcome to SparkIn!',
          content: 'This is your first post on SparkIn. Start writing and sharing your ideas!',
          tags: ['welcome', 'getting-started'],
          author: user._id
        },
        {
          title: 'Getting Started with React',
          content: 'React is a powerful JavaScript library for building user interfaces. Here are some tips to get started.',
          tags: ['react', 'javascript', 'tutorial'],
          author: user._id
        },
        {
          title: 'Node.js Best Practices',
          content: 'Learn the best practices for building scalable Node.js applications.',
          tags: ['nodejs', 'backend', 'javascript'],
          author: user._id
        }
      ];

      await Post.insertMany(posts);
      console.log(`✅ Created ${posts.length} posts`);
    } else {
      console.log('✅ Posts already exist, skipping creation');
    }

    // Verify final state
    const finalPostCount = await Post.countDocuments();
    const finalUserCount = await User.countDocuments();

    console.log(`📊 Final state: ${finalPostCount} posts, ${finalUserCount} users`);

  } catch (error) {
    console.error('❌ Seed failed:', error.message);
  }
};

const run = async () => {
  await connectDB();
  await simpleSeed();
  console.log('✅ Simple seed complete!');
  process.exit(0);
};

run().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
