// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

// Middleware to authenticate requests using JWT
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminUser.findById(decoded.id).select('username');

    if (!admin) {
      return res.status(401).json({ message: 'Account no longer exists' });
    }

    req.user = { id: admin._id.toString(), username: admin.username };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};