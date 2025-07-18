// backend/scripts/quickSeed.js - Quick post creation
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

const quickSeed = async () => {
  try {
    console.log('🚀 Quick seeding posts...');

    // Find any existing user to use as author
    let user = await User.findOne();
    if (!user) {
      console.log('❌ No users found, creating admin user...');
      user = new User({
        username: `admin_${Date.now()}`, // Unique username
        email: `admin_${Date.now()}@sparkin.com`, // Unique email
        password: 'admin123',
        role: 'admin',
        bio: 'Administrator of SparkIn platform',
        isEmailVerified: true
      });
      await user.save();
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Using existing user:', user.username);
    }

    // Clear existing posts
    await Post.deleteMany({});
    console.log('🗑️ Cleared existing posts');

    // Create sample posts
    const samplePosts = [
      {
        title: 'Welcome to SparkIn!',
        content: `# Welcome to SparkIn! ⚡

This is your first post on our amazing blogging platform.

SparkIn is designed for developers, writers, and creators who want to share their knowledge and connect with like-minded individuals.

## Features

- Rich text editor
- Image uploads
- Comments system
- Search functionality
- User profiles

Start writing and sharing your ideas today!`,
        tags: ['welcome', 'getting-started'],
        author: user._id,
        published: true,
        featured: true
      },
      {
        title: 'Getting Started with React',
        content: `# Getting Started with React

React is a popular JavaScript library for building user interfaces.

## Installation

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## Your First Component

\`\`\`jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}
\`\`\`

React makes it easy to build interactive UIs!`,
        tags: ['react', 'javascript', 'tutorial'],
        author: user._id,
        published: true
      },
      {
        title: 'Node.js Best Practices',
        content: `# Node.js Best Practices

Here are some essential best practices for Node.js development:

## 1. Use Environment Variables
Always use environment variables for configuration.

## 2. Handle Errors Properly
Implement proper error handling throughout your application.

## 3. Use Middleware
Leverage middleware for common tasks like authentication and logging.

## 4. Keep Dependencies Updated
Regularly update your dependencies to get security fixes.

Happy coding! 🚀`,
        tags: ['nodejs', 'backend', 'best-practices'],
        author: user._id,
        published: true
      }
    ];

    const createdPosts = await Post.insertMany(samplePosts);
    console.log(`✅ Created ${createdPosts.length} sample posts`);

    // Verify posts were created
    const postCount = await Post.countDocuments({ published: true });
    console.log(`📊 Total published posts: ${postCount}`);

    // Show post titles
    const posts = await Post.find({ published: true }).select('title');
    console.log('📝 Created posts:');
    posts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
    });

  } catch (error) {
    console.error('❌ Failed to seed posts:', error.message);
  }
};

const seed = async () => {
  await connectDB();
  await quickSeed();
  console.log('✅ Quick seeding complete!');
  process.exit(0);
};

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
