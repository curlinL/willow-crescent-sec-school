// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const documentRoutes = require('./routes/documentRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Connect to MongoDB
connectDB();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowAllOrigins = allowedOrigins.includes('*');

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowAllOrigins || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`CORS rejected origin: ${origin}`);
    return callback(null, false);
  },
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Static folder for documents (e.g. /docs/code-of-conduct-2024.pdf)
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/gallery', galleryRoutes);

// Admin routes (protected with JWT)
app.use('/api/admin', adminRoutes);

// Simple health check
app.get('/api', (req, res) => {
  res.json({ message: 'Willow Crescent Secondary API running' });
});

const PORT = process.env.PORT || 5000;
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: status === 500 ? 'Server error' : err.message });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));