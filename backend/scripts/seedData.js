// backend/scripts/seedData.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Bookmark from '../models/Bookmark.js';
import connectDB from '../db.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Sample users data
const users = [
  {
    username: 'admin1',
    email: 'admin@sparkin.com',
    password: 'admin123',
    role: 'admin',
    bio: 'Platform administrator and tech enthusiast. I love building web applications and exploring new technologies.',
  },
  {
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    bio: 'Software developer with a passion for JavaScript and React. I write about web development and programming best practices.',
  },
  {
    username: 'janedoe',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    bio: 'UX/UI designer and front-end developer. I share insights about design systems, user experience, and creative coding.',
  },
  {
    username: 'techguru',
    email: 'tech@example.com',
    password: 'password123',
    role: 'user',
    bio: 'Technology enthusiast and early adopter. I review the latest gadgets and share my thoughts on emerging tech trends.',
  },
  {
    username: 'codemaster',
    email: 'code@example.com',
    password: 'password123',
    role: 'user',
    bio: 'Full-stack developer with expertise in MERN stack. I love solving complex problems and sharing coding tutorials.',
  },
];

// Sample blog posts
const generatePosts = (users) => {
  return [
    {
      title: 'Getting Started with React Hooks',
      content: `# Introduction to React Hooks

React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class component. They allow you to "hook into" React state and lifecycle features from function components.

## Why Hooks?

Before Hooks, function components were often called "stateless functional components" because they couldn't have their own state. If you needed state, you had to use a class component. Hooks change that by allowing function components to have state and access to other React features.

## The Basic Hooks

### useState

The useState hook lets you add state to function components:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useEffect

The useEffect hook lets you perform side effects in function components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Conclusion

React Hooks provide a more direct API to React concepts you already know: props, state, context, refs, and lifecycle. They make it easier to reuse stateful logic between components and they're just more intuitive to work with.

Start using Hooks in your new components, and gradually migrate your existing ones when it makes sense!`,
      tags: ['React', 'JavaScript', 'Frontend', 'Hooks'],
      author: null, // Will be set after user creation
    },
    {
      title: 'Building a RESTful API with Node.js and Express',
      content: `# Creating a RESTful API with Node.js and Express

In this tutorial, we'll build a simple but powerful RESTful API using Node.js and Express.

## Setting Up the Project

First, let's create a new project and install the necessary dependencies:

\`\`\`bash
mkdir express-api
cd express-api
npm init -y
npm install express mongoose dotenv
\`\`\`

## Creating the Server

Let's create our main server file:

\`\`\`javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define routes
app.use('/api/items', require('./routes/api/items'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
\`\`\`
ing a Model

Let's create a simple model for our API:

\`\`\`javascript
// models/Item.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
\`\`\`

## Creating Routes

Now let's create our API routes:

\`\`\`javascript
// routes/api/items.js
const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    await item.remove();
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
\`\`\`

## Testing the API

You can test your API using tools like Postman or curl. Here are some example requests:

- GET all items: \`GET http://localhost:5000/api/items\`
- Create an item: \`POST http://localhost:5000/api/items\` with JSON body \`{ "name": "New Item" }\`
- Delete an item: \`DELETE http://localhost:5000/api/items/:id\`

## Conclusion

You've now built a simple RESTful API with Node.js and Express! This is just the beginning - you can extend this with authentication, more complex models, and additional routes as needed.`,
      tags: ['Node.js', 'Express', 'Backend', 'API'],
      author: null,
    },
    {
      title: 'Introduction to CSS Grid Layout',
      content: `# Mastering CSS Grid Layout

CSS Grid Layout is a powerful tool that has revolutionized the way we create website layouts. In this post, we'll explore the basics of CSS Grid and how to use it effectively.

## What is CSS Grid?

CSS Grid Layout is a two-dimensional layout system designed specifically for the web. It allows you to organize content into rows and columns and has many features that make building complex layouts straightforward.

## Basic Terminology

Before diving in, let's understand some basic terminology:

- **Grid Container**: The element on which \`display: grid\` is applied
- **Grid Item**: The children of the grid container
- **Grid Line**: The dividing lines that make up the structure of the grid
- **Grid Cell**: The space between four grid lines
- **Grid Track**: The space between two adjacent grid lines, either a row or column
- **Grid Area**: The total space surrounded by four grid lines

## Creating a Grid

To create a grid container, you simply need to set the display property to 'grid':

\`\`\`css
.container {
  display: grid;
}
\`\`\`

## Defining Columns and Rows

You can define the columns and rows of your grid using the \`grid-template-columns\` and \`grid-template-rows\` properties:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
}
\`\`\`

This creates a grid with three columns of 200px each and two rows of 100px each.

## Using the fr Unit

The \`fr\` unit represents a fraction of the available space in the grid container:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}
\`\`\`

This creates three columns where the middle column takes up twice as much space as the first and third columns.

## Grid Gap

You can add space between grid items using the \`gap\` property:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
\`\`\`

## Placing Items

You can place items precisely on the grid using the \`grid-column\` and \`grid-row\` properties:

\`\`\`css
.item {
  grid-column: 1 / 3; /* Start at line 1, end at line 3 */
  grid-row: 1 / 2; /* Start at line 1, end at line 2 */
}
\`\`\`

## Responsive Grids with auto-fill and auto-fit

You can create responsive grids that adjust the number of columns based on the available width:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
\`\`\`

## Conclusion

CSS Grid Layout is an incredibly powerful tool for creating web layouts. This post only scratches the surface of what's possible. As you become more comfortable with Grid, you'll find that it simplifies many complex layout tasks that were difficult or impossible with previous CSS layout methods.`,
      tags: ['CSS', 'Web Design', 'Frontend'],
      author: null,
    },
    {
      title: 'Understanding JavaScript Promises',
      content: `# JavaScript Promises Explained

Promises are a fundamental part of modern JavaScript development. They provide a cleaner, more elegant way to handle asynchronous operations compared to callbacks.

## What is a Promise?

A Promise is an object representing the eventual completion or failure of an asynchronous operation. It serves as a placeholder for the result of an asynchronous operation, allowing you to handle the success or failure of that operation when it completes in the future.

## Promise States

A Promise can be in one of three states:

1. **Pending**: Initial state, neither fulfilled nor rejected
2. **Fulfilled**: The operation completed successfully
3. **Rejected**: The operation failed

## Creating a Promise

You can create a new Promise using the Promise constructor:

\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;

  if (success) {
    resolve('Operation completed successfully!');
  } else {
    reject('Operation failed!');
  }
});
\`\`\`

## Consuming Promises

You can consume a Promise using the \`then()\`, \`catch()\`, and \`finally()\` methods:

\`\`\`javascript
myPromise
  .then(result => {
    console.log(result); // 'Operation completed successfully!'
  })
  .catch(error => {
    console.error(error); // This won't run in our example
  })
  .finally(() => {
    console.log('Promise settled (fulfilled or rejected)');
  });
\`\`\`

## Chaining Promises

One of the most powerful features of Promises is the ability to chain them:

\`\`\`javascript
fetchUserData(userId)
  .then(userData => fetchUserPosts(userData.username))
  .then(posts => displayPosts(posts))
  .catch(error => handleError(error));
\`\`\`

## Promise.all()

\`Promise.all()\` allows you to run multiple Promises in parallel and wait for all of them to complete:

\`\`\`javascript
const promise1 = fetchUserData(user1Id);
const promise2 = fetchUserData(user2Id);
const promise3 = fetchUserData(user3Id);

Promise.all([promise1, promise2, promise3])
  .then(results => {
    // results is an array containing the resolved values of all three promises
    console.log(results);
  })
  .catch(error => {
    // If any promise is rejected, this catch will run
    console.error(error);
  });
\`\`\`

## Promise.race()

\`Promise.race()\` returns the first Promise that resolves or rejects:

\`\`\`javascript
const promise1 = new Promise(resolve => setTimeout(() => resolve('First'), 500));
const promise2 = new Promise(resolve => setTimeout(() => resolve('Second'), 100));

Promise.race([promise1, promise2])
  .then(result => {
    console.log(result); // 'Second'
  });
\`\`\`

## Async/Await

Modern JavaScript provides the \`async\` and \`await\` keywords, which make working with Promises even easier:

\`\`\`javascript
async function fetchUserDataAndPosts(userId) {
  try {
    const userData = await fetchUserData(userId);
    const posts = await fetchUserPosts(userData.username);
    return posts;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Using the async function
fetchUserDataAndPosts(123)
  .then(posts => displayPosts(posts))
  .catch(error => handleError(error));
\`\`\`

## Conclusion

Promises have transformed how we handle asynchronous operations in JavaScript, making our code more readable, maintainable, and easier to reason about. With the addition of async/await syntax, working with asynchronous code is now almost as straightforward as working with synchronous code.`,
      tags: ['JavaScript', 'Promises', 'Async'],
      author: null,
    },
    {
      title: 'Introduction to Docker for Developers',
      content: `# Docker for Developers: A Beginner's Guide

Docker has revolutionized how developers build, ship, and run applications. In this guide, we'll explore the basics of Docker and how it can improve your development workflow.

## What is Docker?

Docker is a platform that uses containerization technology to make it easier to create, deploy, and run applications. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package.

## Why Use Docker?

- **Consistency**: Docker ensures that your application runs the same way in every environment
- **Isolation**: Containers isolate your application from the host system
- **Portability**: Docker containers can run on any machine that has Docker installed
- **Efficiency**: Containers share the host OS kernel, making them more lightweight than virtual machines
- **Scalability**: Docker makes it easy to scale your application horizontally

## Docker Terminology

- **Image**: A blueprint for a container
- **Container**: A running instance of an image
- **Dockerfile**: A text file with instructions to build a Docker image
- **Docker Hub**: A registry of Docker images
- **Docker Compose**: A tool for defining and running multi-container Docker applications

## Installing Docker

You can download Docker Desktop for Windows and Mac from the [official Docker website](https://www.docker.com/products/docker-desktop). For Linux, you can install Docker Engine directly.

## Your First Dockerfile

Let's create a simple Dockerfile for a Node.js application:

\`\`\`dockerfile
# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
\`\`\`

## Building and Running a Docker Image

To build an image from your Dockerfile:

\`\`\`bash
docker build -t my-node-app .
\`\`\`

To run a container from your image:

\`\`\`bash
docker run -p 3000:3000 my-node-app
\`\`\`

This maps port 3000 in the container to port 3000 on your host machine.

## Docker Compose

For applications with multiple services, Docker Compose simplifies the process. Create a \`docker-compose.yml\` file:

\`\`\`yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: mongo:4.4
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:
\`\`\`

Run your multi-container application with:

\`\`\`bash
docker-compose up
\`\`\`

## Docker Commands Cheat Sheet

- \`docker images\`: List all images
- \`docker ps\`: List running containers
- \`docker ps -a\`: List all containers (including stopped ones)
- \`docker stop <container_id>\`: Stop a container
- \`docker rm <container_id>\`: Remove a container
- \`docker rmi <image_id>\`: Remove an image
- \`docker logs <container_id>\`: View container logs
- \`docker exec -it <container_id> bash\`: Open a bash shell in a container

## Conclusion

Docker has become an essential tool for modern software development. By containerizing your applications, you can ensure they run consistently across different environments, simplify your deployment process, and improve your development workflow.

As you become more comfortable with Docker, you'll discover more advanced features and best practices that can further enhance your development experience.`,
      tags: ['Docker', 'DevOps', 'Containers'],
      author: null,
    },
    {
      title: 'Getting Started with TypeScript',
      content: `# TypeScript: The JavaScript Superset

TypeScript has gained enormous popularity in recent years, and for good reason. It adds static typing to JavaScript, helping developers catch errors early and write more maintainable code.

## What is TypeScript?

TypeScript is a strongly typed programming language that builds on JavaScript. It's developed and maintained by Microsoft. TypeScript adds optional static typing and class-based object-oriented programming to JavaScript.

## Why Use TypeScript?

- **Type Safety**: Catch type-related errors at compile time rather than runtime
- **Better IDE Support**: Get better autocompletion, navigation, and refactoring tools
- **Enhanced Readability**: Types serve as documentation for your code
- **Improved Maintainability**: Makes it easier to refactor and understand code, especially in large codebases
- **Modern JavaScript Features**: Use the latest JavaScript features while maintaining compatibility with older browsers

## Setting Up TypeScript

First, install TypeScript globally:

\`\`\`bash
npm install -g typescript
\`\`\`

Create a TypeScript configuration file (\`tsconfig.json\`):

\`\`\`bash
tsc --init
\`\`\`

This creates a \`tsconfig.json\` file with default settings. You can customize these settings based on your project needs.

## Basic Types

TypeScript provides several basic types:

\`\`\`typescript
// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;

// String
let color: string = "blue";
let greeting: string = \`Hello, my name is \${name}\`;

// Array
let list: number[] = [1, 2, 3];
let fruits: Array<string> = ['apple', 'banana', 'orange'];

// Tuple
let x: [string, number] = ["hello", 10];

// Enum
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;

// Void
function warnUser(): void {
    console.log("This is a warning message");
}

// Null and Undefined
let u: undefined = undefined;
let n: null = null;

// Never
function error(message: string): never {
    throw new Error(message);
}
\`\`\`

## Interfaces

Interfaces define the structure of objects:

\`\`\`typescript
interface User {
    id: number;
    name: string;
    email: string;
    age?: number; // Optional property
    readonly createdAt: Date; // Can't be changed after creation
}

function createUser(user: User): void {
    console.log(\`Created user: \${user.name}\`);
}

createUser({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date()
});
\`\`\`

## Classes

TypeScript supports class-based object-oriented programming:

\`\`\`typescript
class Person {
    private name: string;
    protected age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): void {
        console.log(\`Hello, my name is \${this.name} and I am \${this.age} years old.\`);
    }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, age: number, department: string) {
        super(name, age);
        this.department = department;
    }

    introduce(): void {
        console.log(\`I work in the \${this.department} department.\`);
    }
}

const john = new Employee("John", 30, "Engineering");
john.greet(); // "Hello, my name is John and I am 30 years old."
john.introduce(); // "I work in the Engineering department."
\`\`\`

## Generics

Generics allow you to create reusable components:

\`\`\`typescript
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString");
let output2 = identity<number>(100);
\`\`\`

## Type Assertions

Type assertions are a way to tell the compiler "trust me, I know what I'm doing":

\`\`\`typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
// Or using the angle-bracket syntax
let strLength2: number = (<string>someValue).length;
\`\`\`

## Conclusion

TypeScript offers significant advantages for JavaScript developers, especially for large-scale applications. By adding static typing, it helps catch errors early, improves code quality, and enhances the development experience with better tooling support.

As you become more comfortable with TypeScript, you'll discover more advanced features that can help you write even more robust and maintainable code.`,
      tags: ['TypeScript', 'JavaScript', 'Programming'],
      author: null,
    },
  ];
};

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Bookmark.deleteMany({});

    console.log('Previous data cleared');

    // Create users with hashed passwords
    const createdUsers = [];
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const newUser = new User({
        ...user,
        password: hashedPassword
      });

      const savedUser = await newUser.save();
      createdUsers.push(savedUser);
      console.log(`Created user: ${savedUser.username}`);
    }

    // Create posts
    const posts = generatePosts(createdUsers);
    const createdPosts = [];

    for (let i = 0; i < posts.length; i++) {
      // Assign each post to a random user
      const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
      const post = new Post({
        ...posts[i],
        author: createdUsers[randomUserIndex]._id
      });

      const savedPost = await post.save();
      createdPosts.push(savedPost);
      console.log(`Created post: ${savedPost.title}`);
    }

    // Create some bookmarks
    for (const user of createdUsers) {
      // Each user bookmarks 1-3 random posts
      const numBookmarks = Math.floor(Math.random() * 3) + 1;
      const shuffledPosts = [...createdPosts].sort(() => 0.5 - Math.random());

      for (let i = 0; i < numBookmarks && i < shuffledPosts.length; i++) {
        const bookmark = new Bookmark({
          user: user._id,
          post: shuffledPosts[i]._id
        });

        await bookmark.save();
        console.log(`Created bookmark for user ${user.username}`);
      }
    }

    console.log('Data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();
