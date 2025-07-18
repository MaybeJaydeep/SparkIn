// backend/scripts/seedPosts.js
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

const seedPosts = async () => {
  try {
    console.log('🌱 Seeding posts...');

    // Find or create a user
    let user = await User.findOne({ email: 'admin@sparkin.com' });
    if (!user) {
      // Try to find by username in case email is different
      user = await User.findOne({ username: 'admin' });
      if (!user) {
        user = new User({
          username: 'admin',
          email: 'admin@sparkin.com',
          password: 'admin123',
          role: 'admin',
          bio: 'Administrator of SparkIn platform',
          isEmailVerified: true
        });
        await user.save();
        console.log('✅ Admin user created');
      } else {
        console.log('✅ Found existing admin user by username');
      }
    } else {
      console.log('✅ Found existing admin user by email');
    }

    // Check if posts already exist
    const existingPostCount = await Post.countDocuments();
    console.log(`📊 Current posts in database: ${existingPostCount}`);

    if (existingPostCount > 0) {
      console.log('📝 Posts already exist, clearing them first...');
      await Post.deleteMany({});
      console.log('🗑️ Cleared existing posts');
    }

    // Create sample posts
    const samplePosts = [
      {
        title: 'Welcome to SparkIn!',
        content: `Welcome to SparkIn! This is your first post on our amazing blogging platform.

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
        content: `React is a popular JavaScript library for building user interfaces. Here's how to get started:

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

React makes it easy to build interactive UIs with reusable components.`,
        tags: ['react', 'javascript', 'tutorial'],
        author: user._id,
        published: true
      },
      {
        title: 'The Power of Node.js',
        content: `Node.js has revolutionized server-side development with JavaScript.

## Why Node.js?

- Fast and scalable
- Large ecosystem (npm)
- JavaScript everywhere
- Great for APIs and real-time apps

## Example Server

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);
\`\`\`

Node.js makes backend development accessible to frontend developers.`,
        tags: ['nodejs', 'backend', 'javascript'],
        author: user._id,
        published: true
      },
      {
        title: 'CSS Grid vs Flexbox',
        content: `Both CSS Grid and Flexbox are powerful layout systems, but they serve different purposes.

## Flexbox
- One-dimensional layout
- Great for components
- Perfect for navigation bars

## CSS Grid
- Two-dimensional layout
- Ideal for page layouts
- More control over positioning

## When to Use What?

Use Flexbox for component-level layout and CSS Grid for page-level layout.`,
        tags: ['css', 'web-design', 'layout'],
        author: user._id,
        published: true
      },
      {
        title: 'MongoDB Best Practices',
        content: `MongoDB is a powerful NoSQL database. Here are some best practices:

## Schema Design
- Embed related data when possible
- Use references for large or frequently changing data
- Consider query patterns

## Indexing
- Create indexes for frequently queried fields
- Use compound indexes for multiple field queries
- Monitor index usage

## Performance
- Use aggregation pipelines for complex queries
- Implement proper pagination
- Consider read/write patterns

Following these practices will help you build scalable applications.`,
        tags: ['mongodb', 'database', 'best-practices'],
        author: user._id,
        published: true
      }
    ];

    const createdPosts = await Post.insertMany(samplePosts);
    console.log(`✅ Created ${createdPosts.length} sample posts`);

    // Verify posts were created
    const postCount = await Post.countDocuments();
    console.log(`📊 Total posts in database: ${postCount}`);

  } catch (error) {
    console.error('❌ Failed to seed posts:', error.message);
  }
};

const seed = async () => {
  console.log('🚀 Starting post seeding...');

  await connectDB();
  await seedPosts();

  console.log('✅ Seeding complete!');
  process.exit(0);
};

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
