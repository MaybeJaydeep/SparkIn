# 🚀 SparkIn Deployment Guide

This guide will help you deploy SparkIn to production.

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or MongoDB instance)
- GitHub account
- Hosting accounts (see options below)

---

## 🔧 Step 1: Environment Setup

### Backend Environment Variables

Create `backend/.env` file with these variables:

```env
NODE_ENV=production
PORT=5000

# MongoDB Atlas connection string
# Format: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
# Get this from MongoDB Atlas dashboard → Connect → Connect your application
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/sparkin?retryWrites=true&w=majority

# Generate a secure JWT secret (32+ characters)
# Run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_generated_secret_here

# Your deployed frontend URL
FRONTEND_URL=https://your-frontend-domain.com
CORS_ORIGIN=https://your-frontend-domain.com

# Email (optional - for password reset, etc.)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="SparkIn <noreply@sparkin.com>"

# Cloudinary (optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend Environment Variables

Create `.env` file in the root directory:

```env
# Your deployed backend API URL
VITE_API_URL=https://your-backend-domain.com
```

**Note:** In development, leave `VITE_API_URL` empty to use the Vite proxy.

---

## 🌐 Step 2: Choose Your Deployment Platform

### Option A: Render (Backend) + Vercel (Frontend) ⭐ Recommended

#### Deploy Backend to Render

1. **Sign up** at [render.com](https://render.com)
2. **Create a new Web Service**
   - Connect your GitHub repository
   - Name: `sparkin-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment: `Node`
3. **Add Environment Variables** in Render dashboard:
   - Copy all variables from `backend/.env`
4. **Deploy** - Render will automatically deploy on every push to `main`

#### Deploy Frontend to Vercel

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import your GitHub repository**
3. **Configure Project:**
   - Framework Preset: `Vite`
   - Root Directory: `.` (root)
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Add Environment Variable:**
   - `VITE_API_URL` = Your Render backend URL (e.g., `https://sparkin-backend.onrender.com`)
5. **Deploy** - Vercel will auto-deploy on every push

---

### Option B: Railway (Both Backend & Frontend)

#### Deploy Backend

1. **Sign up** at [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub repo**
3. **Add Service** → **Empty Service**
4. **Settings:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. **Variables** → Add all from `backend/.env`
6. **Generate Domain** (or use custom domain)

#### Deploy Frontend

1. **Add another service** in the same project
2. **Settings:**
   - Root Directory: `.` (root)
   - Build Command: `npm run build`
   - Start Command: `npx serve dist -s -l 3000`
3. **Variables:**
   - `VITE_API_URL` = Your backend Railway URL
4. **Generate Domain**

---

### Option C: MongoDB Atlas Setup

1. **Sign up** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Create a free cluster** (M0 Sandbox)
3. **Create Database User:**
   - Database Access → Add New User
   - Username & Password (save these!)
4. **Whitelist IP:**
   - Network Access → Add IP Address
   - For Render/Railway: Add `0.0.0.0/0` (allow all)
5. **Get Connection String:**
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database password
   - Use this as `MONGO_URI` in your backend `.env`

---

## ✅ Step 3: Post-Deployment Checklist

- [ ] Backend is accessible (test: `https://your-backend.com/` should return "✅ SparkIn API is running...")
- [ ] Frontend can connect to backend (check browser console for API errors)
- [ ] CORS is configured correctly (backend allows frontend domain)
- [ ] MongoDB connection is working (check backend logs)
- [ ] Environment variables are set correctly
- [ ] Test user registration/login
- [ ] Test creating a post
- [ ] SSL/HTTPS is enabled (most platforms do this automatically)

---

## 🔍 Troubleshooting

### Backend Issues

**"MongoDB connection failed"**
- Check `MONGO_URI` format
- Verify IP whitelist in MongoDB Atlas
- Check database user credentials

**"CORS error"**
- Verify `CORS_ORIGIN` matches your frontend URL exactly
- Check for trailing slashes

**"JWT_SECRET not defined"**
- Ensure all environment variables are set in your hosting platform

### Frontend Issues

**"API calls failing"**
- Verify `VITE_API_URL` is set correctly
- Check backend is running and accessible
- Verify CORS configuration

**"Build fails"**
- Run `npm install` locally first to check for dependency issues
- Check Node.js version (needs 18+)

---

## 📝 Custom Domain Setup

### Backend (Render/Railway)

1. In your service settings, add custom domain
2. Update DNS records as instructed
3. Update `CORS_ORIGIN` and `FRONTEND_URL` in backend `.env`

### Frontend (Vercel)

1. In project settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Update `VITE_API_URL` in frontend `.env` to use new backend domain

---

## 🎉 You're Live!

Once deployed, your SparkIn blog platform will be accessible to the world!

**Next Steps:**
- Create your admin account
- Customize the design
- Add more features
- Monitor performance

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)

