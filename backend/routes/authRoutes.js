// backend/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const AdminUser = require('../models/AdminUser');
const { sendVerificationEmail } = require('../config/email');

const router = express.Router();

// Rate limiter for registration - 5 requests per hour per IP
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { message: 'Too many registration attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for verification - 10 requests per hour per IP
const verifyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { message: 'Too many verification attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/auth/register
router.post('/register', registerLimiter, async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  // Email validation - comprehensive RFC 5322 compliant pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    // Check if username or email already exists
    const existingUser = await AdminUser.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new admin user
    const admin = new AdminUser({ username, email });
    await admin.setPassword(password);
    const verificationToken = admin.generateVerificationToken();
    await admin.save();

    // Send verification email
    try {
      await sendVerificationEmail(email, username, verificationToken);
      res.status(201).json({
        message: 'Registration successful! Please check your email to verify your account.',
      });
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
      // Still save the user but inform about email issue
      res.status(201).json({
        message: 'Registration successful! However, there was an issue sending the verification email. Please contact support.',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// GET /api/auth/verify/:token
router.get('/verify/:token', verifyLimiter, async (req, res) => {
  const { token } = req.params;

  try {
    const admin = await AdminUser.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    admin.isVerified = true;
    admin.verificationToken = undefined;
    admin.verificationTokenExpires = undefined;
    await admin.save();

    res.json({ message: 'Email verified successfully! You can now log in.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during verification' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await AdminUser.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await admin.validatePassword(password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!admin.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;