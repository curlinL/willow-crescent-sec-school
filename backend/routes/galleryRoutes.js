// backend/routes/galleryRoutes.js
const express = require('express');
const GalleryItem = require('../models/GalleryItem');

const router = express.Router();

// GET /api/gallery
router.get('/', async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching gallery' });
  }
});

// Optional seed route similar to docs (not implemented)

module.exports = router;