// backend/middleware/validation.js
export const validatePost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ message: 'Title is required' });
  }

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ message: 'Content is required' });
  }

  if (title.length > 200) {
    return res.status(400).json({ message: 'Title must be less than 200 characters' });
  }

  if (content.length > 50000) {
    return res.status(400).json({ message: 'Content must be less than 50,000 characters' });
  }

  next();
};

export const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || username.trim().length === 0) {
    return res.status(400).json({ message: 'Username is required' });
  }

  if (!email || email.trim().length === 0) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email' });
  }

  next();
};
