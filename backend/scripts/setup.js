// backend/scripts/setup.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

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

const createIndexes = async () => {
  try {
    console.log('📊 Creating database indexes...');

    // Create text indexes for search
    await Post.collection.createIndex({
      title: 'text',
      content: 'text',
      tags: 'text'
    });

    // Create compound indexes for better performance
    await Post.collection.createIndex({ author: 1, createdAt: -1 });
    await Post.collection.createIndex({ published: 1, createdAt: -1 });
    await Post.collection.createIndex({ featured: 1, createdAt: -1 });
    await Post.collection.createIndex({ tags: 1 });

    // User indexes
    await User.collection.createIndex({ username: 1 }, { unique: true });
    await User.collection.createIndex({ email: 1 }, { unique: true });

    // Comment indexes
    await Comment.collection.createIndex({ post: 1, createdAt: -1 });
    await Comment.collection.createIndex({ author: 1, createdAt: -1 });

    console.log('✅ Database indexes created successfully');
  } catch (error) {
    console.error('❌ Failed to create indexes:', error.message);
  }
};

const createSampleData = async () => {
  try {
    console.log('📝 Creating sample data...');

    // Check if admin user exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const adminUser = new User({
        username: 'admin',
        email: 'admin@sparkin.com',
        password: 'admin123',
        role: 'admin',
        bio: 'Administrator of SparkIn platform',
        isEmailVerified: true
      });
      await adminUser.save();
      console.log('✅ Admin user created (admin@sparkin.com / admin123)');
    }

    // Check if sample posts exist
    const postCount = await Post.countDocuments();
    if (postCount === 0) {
      const admin = await User.findOne({ role: 'admin' });

      const samplePosts = [
        {
          title: 'Welcome to SparkIn!',
          content: `# Welcome to SparkIn! ⚡

SparkIn is a modern blogging platform designed for developers, writers, and creators who want to share their knowledge and connect with like-minded individuals.

## Features

- **Rich Text Editor**: Write with our powerful editor that supports markdown
- **Image Uploads**: Add beautiful cover images to your posts
- **Comments System**: Engage with your readers through comments and replies
- **Search & Discovery**: Find content easily with our advanced search
- **User Profiles**: Customize your profile and follow other writers

## Getting Started

1. Create your account and verify your email
2. Complete your profile with a bio and social links
3. Write your first post and share it with the community
4. Explore other posts and engage with the community

Happy writing! 🚀`,
          tags: ['welcome', 'getting-started', 'sparkin'],
          author: admin._id,
          featured: true,
          published: true
        },
        {
          title: 'The Future of Web Development',
          content: `# The Future of Web Development

Web development is constantly evolving, and staying up-to-date with the latest trends and technologies is crucial for developers.

## Key Trends to Watch

### 1. AI Integration
Artificial Intelligence is becoming increasingly integrated into web development workflows, from code generation to automated testing.

### 2. Progressive Web Apps (PWAs)
PWAs continue to bridge the gap between web and native applications, offering better performance and user experience.

### 3. Serverless Architecture
Serverless computing is changing how we think about backend development, offering scalability and cost-effectiveness.

### 4. WebAssembly
WebAssembly is enabling high-performance applications in the browser, opening new possibilities for web development.

## Conclusion

The future of web development is exciting, with new technologies and approaches constantly emerging. Stay curious and keep learning!`,
          tags: ['web-development', 'technology', 'future', 'trends'],
          author: admin._id,
          published: true
        },
        {
          title: 'Building Scalable APIs with Node.js',
          content: `# Building Scalable APIs with Node.js

Node.js has become a popular choice for building APIs due to its performance and JavaScript ecosystem.

## Best Practices

### 1. Use Express.js Framework
Express.js provides a robust set of features for building APIs quickly and efficiently.

### 2. Implement Proper Error Handling
Always handle errors gracefully and provide meaningful error messages to clients.

### 3. Use Middleware for Common Tasks
Leverage middleware for authentication, logging, and request validation.

### 4. Implement Rate Limiting
Protect your API from abuse by implementing rate limiting.

### 5. Use Environment Variables
Keep sensitive configuration data in environment variables.

## Example Code

\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  // Implementation here
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

Building scalable APIs requires careful planning and following best practices from the start.`,
          tags: ['nodejs', 'api', 'backend', 'javascript', 'express'],
          author: admin._id,
          published: true
        }
      ];

      await Post.insertMany(samplePosts);
      console.log('✅ Sample posts created');
    }

    console.log('✅ Sample data setup complete');
  } catch (error) {
    console.error('❌ Failed to create sample data:', error.message);
  }
};

const setup = async () => {
  console.log('🚀 Starting SparkIn database setup...');

  await connectDB();
  await createIndexes();
  await createSampleData();

  console.log('✅ Setup complete! You can now start the server.');
  process.exit(0);
};

setup().catch((error) => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
});
